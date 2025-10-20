function initInteractiveElements() {
  // COLLAPSIBLES
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach(button => {
    button.addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      content.classList.toggle("show");
    });
  });

  // DROPDOWNS (for mobile)
  document.querySelectorAll(".dropdown > a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      a.parentElement.classList.toggle("open");
    });
  });

  // MOBILE NAV TOGGLE
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
    });
  }
}

// Dynamically load navbar
fetch("common/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
    initInteractiveElements(); // attach all events after navbar loads
  })
  .catch(err => console.error("Navbar load failed:", err));
