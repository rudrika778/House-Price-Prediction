# House Price Prediction using Linear Regression

## What does this project do?
This project predicts the price of a house based on its area (sq. ft.) and location using a Linear Regression model.

## Features used
- Area (sq. ft.)
- Location (Lucknow, Delhi, Mumbai)

## Libraries used
- Pandas
- NumPy
- Scikit-learn
- Matplotlib

## How it works
1. Created a dataset with area, location and price
2. Converted location into numbers using One Hot Encoding
3. Trained a Linear Regression model on the data
4. Predicted prices for new houses
5. Plotted actual prices vs predicted regression line

## How to run
1. Install libraries:
   ```
   pip install pandas numpy scikit-learn matplotlib
   ```
2. Open and run `house_price_prediction.ipynb` in Jupyter Notebook

## Sample Output
The model predicts different prices for the same area based on location:
- 1200 sq ft in Mumbai → highest price
- 1200 sq ft in Delhi → mid range
- 1200 sq ft in Lucknow → lowest price
