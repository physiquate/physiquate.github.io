// ------------- Highlight Active Menu Item -------------
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
      link.style.color = "#ffeb3b"; // highlight yellow
      link.style.borderBottom = "2px solid #ffeb3b";
    }
  });
});

// ------------- Smooth Scroll for Internal Links -------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
