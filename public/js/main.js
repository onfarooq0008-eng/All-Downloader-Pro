document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelector("form");

const loader = document.querySelector(".loader");

const progress = document.querySelector(".progress");

const bar = document.querySelector(".progress-bar");

const toast = document.querySelector(".toast");

if(form){

form.addEventListener("submit",()=>{

if(loader) loader.style.display="block";

if(progress){

progress.style.display="block";

let width=0;

const interval=setInterval(()=>{

width+=5;

if(bar) bar.style.width=width+"%";

if(width>=95){

clearInterval(interval);

}

},300);

});

}

function showToast(message){

if(!toast) return;

toast.innerText=message;

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},3000);

}

window.showToast=showToast;

const darkButton=document.getElementById("darkMode");

if(darkButton){

darkButton.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

? "dark"

: "light"

);

});

}

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

}

});
