(function(){

  // --- NAVBAR AND DROPDOWNS ---
  document.addEventListener("DOMContentLoaded", function(){

    // --- COLLAPSIBLE SECTIONS ---
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach(btn=>{
      btn.addEventListener("click",function(){
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        content.classList.toggle("show");
      });
    });

    // --- SCROLL REVEAL ---
    const panels = document.querySelectorAll(".panel");
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });
    panels.forEach(p=>io.observe(p));

    // --- DOWN ARROW SMOOTH SCROLL ---
    const down = document.querySelector(".down-arrow");
    if(down){
      down.addEventListener("click", e=>{
        e.preventDefault();
        const target = document.querySelector('#about');
        if(target) target.scrollIntoView({behavior:'smooth'});
      });
    }

    // --- SET YEAR ---
    const yearEl = document.getElementById("year");
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  });

})();
