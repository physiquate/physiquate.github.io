fetch("../common/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    // MOBILE TOGGLE
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");
    if(toggle && menu){
      toggle.addEventListener("click", ()=>{
        menu.classList.toggle("active");
        const expanded = toggle.getAttribute("aria-expanded")==="true";
        toggle.setAttribute("aria-expanded", !expanded);
      });
    }

    // DROPDOWNS
    document.querySelectorAll(".dropdown > a").forEach(a=>{
      a.addEventListener("click", e=>{
        e.preventDefault();
        a.parentElement.classList.toggle("open");
      });
    });

  }).catch(err=>console.error("Navbar load failed:", err));
