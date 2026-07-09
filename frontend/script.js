const API_URL="https://house-price-prediction-2j3x.onrender.com/predict";

//Element Refrences
const resultBox=document.getElementById('resultBox');
const priceOutput=document.getElementById('priceOutput');
const areaInput=document.getElementById('area');
const areaError=document.getElementById('areaError');
const predictBtn=document.getElementById('predictBtn');
const locationSelect=document.getElementById('location');

const menuIcon=document.getElementById('menuIcon');
const navDropdown=document.getElementById('navDropdown');

//Menu toggle
menuIcon.addEventListener('click',function(){
    menuIcon.classList.toggle('open');
    navDropdown.classList.toggle('show');
});
document.addEventListener('click',function(e){
    if (!menuIcon.contains(e.target) && !navDropdown.contains(e.target)){
        menuIcon.classList.remove('open');
        navDropdown.classList.remove('show');
    }     
});

//Page switching(home/about us)
function showPage(page){
    const homePage=document.getElementById('homePage');
    const aboutPage=document.getElementById('aboutPage');
    
    if (page=='home'){
        homePage.style.display='block';
        aboutPage.style.display='none';
    }
    else if(page=='about'){
        homePage.style.display='none';
        aboutPage.style.display='block';
    }
    menuIcon.classList.remove('open');
    navDropDown.classList.remove('show');
}

//Predict Button --> calls the FastAPI backend

predictBtn.addEventListener('click',async function() {
    const location=locationSelect.value;
    const area=parseFloat(areaInput.value);

    if (!location){
        resultBox.classList.remove('show');
        alert('Please select a location');
        return;
    }
    if (!area || area<=0){
        areaError.classList.add('show');
        resultBox.classList.remove('show');
        return ;

    }
    areaError.classList.remove('show');

    const originalText=predictBtn.textContent;
    predictBtn.textContent='Predicting...';
    predictBtn.disabled=true;

    try{
        const response=await fetch(API_URL,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({area: area,location: location})
        });
        if(!response.ok){
            throw new Error('Server returned status'+response.status);
        }
        const data=await response.json();

        priceOutput.textContent='₹' +Number(data.predicted_price).toLocaleString('en-IN');
        resultBox.classList.add('show');
    }
    catch(error){
        console.error('Prediction request failed: ',error);
        alert('Could not reach the prediction server.Make sure your FastAPI backed is at '+ API_URL);

    }
    finally{
        predictBtn.textContent=originalText;
        predictBtn.disabled=false;
    }
});
