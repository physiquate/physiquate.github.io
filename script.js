document.addEventListener("DOMContentLoaded", () => {
  // ---------- Highlight Active Menu Item ----------
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });

  // ---------- Smooth Scroll for Internal Links ----------
  const headerOffset = 70; // optional, if you have a fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
