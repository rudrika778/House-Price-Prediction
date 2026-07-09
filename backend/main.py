from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model=joblib.load("house_price_model.pkl")

class PredictRequest(BaseModel):
    area:float
    location:str
@app.post("/predict")
def predict(data: PredictRequest):
    input_df=pd.DataFrame({
        'area':[data.area],
        'location_Delhi': [1 if data.location=='Delhi' else 0],
        'location_Lucknow': [1 if data.location =='Lucknow' else 0],
        'location_Mumbai': [1 if data.location =='Mumbai' else 0]

    }) 
    prediction =model.predict(input_df)[0]
    price =prediction * 1000

    return {"predicted_price": round(price,2)}   