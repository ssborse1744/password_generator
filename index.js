// jevdhe elements ahet eg slider , input vagera vagera jyancha vrti apn js lau tyanna import krtoy

const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#upperCase");
const lowercaseCheck = document.querySelector("#lowerCase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const indicator = document.querySelector(".indicator");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~!@#$%^&*(){}[]|\<>,.?/:;`";


//by default
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// set strength color to red 
setIndicator("#ccc");


 //set pasword length by sliding

 function handleSlider() {        // this func just displays psw change on UI
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;

    inputSlider.style.backgroundSize = ((passwordLength - min) * 100/(max - min)) + "% 100%"

 }

 function setIndicator(color)
 {
   indicator.style.backgroundColor = color;
   // indicator.style.boxShadow = `0 0 12px 1px ${color}`;
 }

 function getRndInteger(min , max)
 {
   return Math.floor(Math.random() * (max - min) + min);
 } 

 function generateRandomNumber()
 {
   return getRndInteger(0 , 9);
 }

 function generateLowerCase()
 {
   return String.fromCharCode(getRndInteger(97 , 123));
 }
 function generateUpperCase()
 {
   return String.fromCharCode(getRndInteger(65 , 91));
 }

 function generateSymbol()
{
   let n = symbols.length;
   return symbols.charAt(getRndInteger(0 , n - 1));
}

function calcStrength()
{
   let hasUpper = false;
   let hasLower = false;
   let hasNumber = false;
   let hasSymbol = false;

   if(uppercaseCheck.checked) 
      hasUpper = true;
   if(lowercaseCheck.checked) 
      hasLower = true;
   if(numbersCheck.checked) 
      hasNumber = true;
   if(symbolCheck.checked) 
      hasSymbol = true;

   if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8)
         setIndicator("#0f0");
   else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength >= 6)
         setIndicator("#ff0");
   else  
      setIndicator("#f00");

 
}

async function copyContent()
{
   let text = passwordDisplay.value;
   
     try {
       await navigator.clipboard.writeText(text);
       copyMsg.innerText = "Copied!";
       console.log('Content copied to clipboard');
     } catch (err) {
       console.error('Failed to copy: ', err);
     }

     //To make copy wala span visible
     copyMsg.classList.add("active");

     setTimeout( () => {
      copyMsg.classList.remove("active");
     }, 2000);


   
}

//event listner on slider
inputSlider.addEventListener('input' , (eve) => {
   passwordLength = eve.target.value;
   handleSlider();
});

//event listner on cpybtn

copyBtn.addEventListener('click' , () => {
   if(passwordDisplay.value)
         copyContent();
   //or
   //if(passwordlength > 0)
      //copyContent();
});

//event listner on checkbox to update the number of boxes that are checked
function handleCheckBoxChange()
{
   checkCount = 0;
   allCheckBox.forEach((checkBox) => {
      if(checkBox.checked)
         checkCount++;
   });

   //special condn 
   if(passwordLength < checkCount)
   {
      passwordLength = checkCount;
      handleSlider();
   }
}

allCheckBox.forEach((checkBox) => {
   checkBox.addEventListener('change' , handleCheckBoxChange);
});

function shufflePassword(shufflePassword)
{
   //fisher yates method

   for(let i = shufflePassword.length - 1 ; i > 0 ; i--)
   {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
   }

   let str = "";
   shufflePassword.forEach((el) => (str += el));

   return str;


}

//event listner on generate password
generateBtn.addEventListener('click' , () => {

   //if none check box is checked 
   if(checkCount <= 0)
         return;
   
   if(passwordLength < checkCount){
      passwordLength  = checkCount;
      handleSlider();
   }

   //new psw find
   // remove old psw

   //aadhi je bollay te tr takun deu

   // if(uppercaseCheck.checked)
   // {
   //    password += generateUpperCase();
   // }
   // if(lowercaseCheck.checked)
   // {
   //    password += generateLowerCase();
   // }
   // if(numbersCheck.checked)
   //  {
   //     password += generateRandomNumber();
   //  }
   //  if(symbolCheck.checked)
   //  {
   //       password += generateSymbol();
   //  }

   let funcArr = []; // array of function

   if(uppercaseCheck.checked)
      funcArr.push(generateUpperCase);

   if(lowercaseCheck.checked)
         funcArr.push(generateLowerCase);

   if(numbersCheck.checked)
         funcArr.push(generateRandomNumber);

   if(symbolCheck.checked)
         funcArr.push(generateSymbol);
   
   //cmpulsory addition

   for(let i = 0 ; i < funcArr.length ; i++)
      password += funcArr[i]();

   //remaining addition
   for(let i = 0 ; i < passwordLength - funcArr.length ; i++)
   {
      let rnd = getRndInteger(0 , funcArr.length);

      password += funcArr[rnd]();
   }

   //shuffle genrated psw

   // password = shufflePassword(Array.from(password));

   // show in UI
   passwordDisplay.value = password;

   //cal strenght of a psw
   calcStrength();
   

});


      

