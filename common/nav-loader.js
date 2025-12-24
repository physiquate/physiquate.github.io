// Dynamically load navbar
// Get the current script's path (nav-loader.js)
const scriptPath = document.currentScript.src;
// Derive nav.html path by replacing "nav-loader.js" with "nav.html"
const navPath = scriptPath.replace("nav-loader.js", "nav.html");

fetch(navPath)
  .then(res => res.text())
  .then(html => {
    // Determine project root URL (remove "common/nav-loader.js" from script path)
    const rootUrl = scriptPath.replace("common/nav-loader.js", "");

    // Fix image path (logo.png is in common/)
    // Replaces src="logo.png" with src=".../common/logo.png"
    html = html.replace('src="logo.png"', `src="${rootUrl}common/logo.png"`);

    // Fix relative links (href="../...")
    // Replaces href="../" with href=".../" (project root)
    // This assumes nav.html uses "../" to mean "Project Root"
    html = html.replaceAll('href="../', `href="${rootUrl}`);

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
      a.addEventListener("click", function (e) {
        // Only enable click on mobile (width < 800px)
        if (window.innerWidth < 800) {
          e.preventDefault();
          a.parentElement.classList.toggle("open");
        }
      });
    });
  })
  .catch(err => console.error("Navbar load failed:", err));
