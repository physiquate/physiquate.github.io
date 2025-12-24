// ===== SMART NAVBAR LOADER (NO HTML CHANGES REQUIRED) =====

// Get current path (example: /AAI_ATC/ph/mechanics/index.html)
const currentPath = window.location.pathname;

// Split path into folders
const parts = currentPath.split("/").filter(p => p.length > 0);

// Find project root by locating "AAI_ATC"
const rootIndex = parts.indexOf("AAI_ATC");

// Build correct relative path to /common/nav.html
let prefix = "";
if (rootIndex !== -1) {
  for (let i = rootIndex + 1; i < parts.length - 1; i++) {
    prefix += "../";
  }
}

fetch(prefix + "common/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");

    // Mobile menu toggle
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !expanded);
      });
    }

    // Dropdown handling (mobile)
    document.querySelectorAll(".dropdown > a").forEach(a => {
      a.addEventListener("click", e => {
        if (window.innerWidth < 800) {
          e.preventDefault();
          a.parentElement.classList.toggle("open");
        }
      });
    });
  })
  .catch(err => console.error("Navbar load failed:", err));
