// Dynamically load navbar
fetch("../common/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");

    // ===== Mobile toggle button =====
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !expanded);
      });
    }

    // ===== Dropdown menus =====
    document.querySelectorAll(".dropdown > a").forEach(a => {
      a.addEventListener("click", function(e) {
        // Only enable click on mobile (width < 800px)
        if (window.innerWidth < 800) {
          e.preventDefault();
          a.parentElement.classList.toggle("open");
        }
      });
    });
  })
  .catch(err => console.error("Navbar load failed:", err));
