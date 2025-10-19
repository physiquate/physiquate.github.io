// ===== script.js =====
(function () {
  // --- NAV TOGGLE (for mobile menu) ---
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active'); // shows/hides mobile menu
    });
  }

  // --- MOBILE DROPDOWN TOGGLE ---
  const dropdowns = document.querySelectorAll('.dropdown > a');
  dropdowns.forEach(drop => {
    drop.addEventListener('click', e => {
      e.preventDefault();
      const parent = drop.parentElement;
      parent.classList.toggle('open'); // open/close dropdown
    });
  });

  // --- SCROLL REVEAL PANELS ---
  const panels = document.querySelectorAll('.panel');
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );
  panels.forEach(p => io.observe(p));

  // --- FOOTER YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
