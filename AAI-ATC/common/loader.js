// ------------------ INIT INTERACTIVE ELEMENTS ------------------
function initInteractiveElements() {
  // COLLAPSIBLES
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach(button => {
    button.addEventListener("click", function () {
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

  // DOWN ARROW SMOOTH SCROLL
  const down = document.querySelector(".down-arrow");
  if (down) {
    down.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector('#about');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // SCROLL REVEAL
  const panels = document.querySelectorAll(".panel");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  panels.forEach(p => io.observe(p));
}

// ------------------ LOAD NAVBAR ------------------
fetch("common/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
    initInteractiveElements();
  })
  .catch(err => console.error("Navbar load failed:", err));

// ------------------ LOAD FOOTER ------------------
fetch("common/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })
  .catch(err => console.error("Footer load failed:", err));
