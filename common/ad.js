function loadAd(id, file, position){

let element = document.getElementById(id);

if(!element) return;

let observer = new IntersectionObserver(function(entries, obs){

entries.forEach(entry => {

if(entry.isIntersecting){

fetch("../common/" + file)
.then(response => response.text())
.then(data => {

element.innerHTML = data;

if(position){
element.classList.add(position);
}

});

obs.unobserve(element);

}

});

});

observer.observe(element);

}
/* load ads after page ready */

document.addEventListener("DOMContentLoaded", function(){

loadAd("topAd","ad-top.html","ad-top");
loadAd("leftAd","ad-left.html","ad-left");
loadAd("rightAd","ad-right.html","ad-right");
loadAd("bottomAd","ad-bottom.html","ad-bottom");
loadAd("inlineAd1","ad-inline-1.html");
loadAd("inlineAd2","ad-inline-2.html");
loadAd("inlineAd3","ad-inline-3.html");
loadAd("inlineAd4","ad-inline-4.html");
loadAd("inlineAd5","ad-inline-5.html");

});

/* popup ad */

window.addEventListener("load", function(){

let popup = document.getElementById("popupAd");

if(popup){

setTimeout(function(){
popup.style.display = "block";
},3000);

}

});

function closePopup(){

let popup = document.getElementById("popupAd");

if(popup){
popup.style.display = "none";
}

}

function closeAd(button){

let adContainer = button.closest(".ad-box");

if(adContainer){
adContainer.style.display = "none";
}

}
let isMobile = window.innerWidth <= 768;

document.addEventListener("DOMContentLoaded", function(){

loadAd("topAd","ad-top.html","ad-top");

if(!isMobile){
loadAd("leftAd","ad-left.html","ad-left");
loadAd("rightAd","ad-right.html","ad-right");
}

loadAd("bottomAd","ad-bottom.html","ad-bottom");
loadAd("inlineAd","ad-inline.html");

});

function controlStickyAds(){

let footer = document.getElementById("footer");

let ads = [
document.getElementById("leftAd"),
document.getElementById("rightAd"),
document.getElementById("bottomAd")
];

if(!footer) return;

let footerTop = footer.getBoundingClientRect().top;
let screenHeight = window.innerHeight;

ads.forEach(ad => {

if(!ad) return;

if(footerTop < screenHeight){

ad.style.position = "absolute";
ad.style.bottom = (screenHeight - footerTop + 10) + "px";

}else{

ad.style.position = "fixed";

}

});

}

window.addEventListener("scroll", controlStickyAds);