// ===== script.js =====
// Simple scripts: mobile nav toggle, reveal on scroll, set year
(function(){
// NAV TOGGLE
var toggle = document.querySelector('.nav-toggle');
var links = document.querySelector('.nav-links');
if(toggle){
toggle.addEventListener('click', function(){
if(links.style.display === 'flex') links.style.display = 'none';
else links.style.display = 'flex';
});
}


// SET YEAR
var yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();


// REVEAL ON SCROLL
var panels = document.querySelectorAll('.panel');
var io = new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('visible');
}
});
},{threshold:0.12});
panels.forEach(function(p){ io.observe(p); });


// OPTIONAL: down arrow click (smooth scroll is native but we add slight behaviour)
var down = document.querySelector('.down-arrow');
if(down){
down.addEventListener('click', function(e){
e.preventDefault();
var target = document.querySelector('#about');
if(target) target.scrollIntoView({behavior:'smooth'});
});
}
})();
