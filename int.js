let picPathArr = ["pic/background.jpg","pic/background1.jpg","pic/background2.png"];
let i=0;
let printNumbersInterval = setInterval(function(){
   //this.mainDiv.style.backgroundImage="url("+picPathArr[i]+")";
   i++;
   console.log(i);
   if (i===20)clearInterval(printNumbersInterval);
   },500);

document.addEventListener("DOMContentLoaded",()=>{
    printNumbersInterval()});