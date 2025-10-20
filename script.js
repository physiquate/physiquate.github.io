(function() {
  // ===== NAVBAR MOBILE TOGGLE =====
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // ===== DROPDOWNS FOR MOBILE =====
  document.querySelectorAll('.dropdown > a').forEach(a => {
    a.addEventListener('click', function(e) {
      if (window.innerWidth < 800) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });

  // ===== FOOTER YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== REVEAL ON SCROLL =====
  const panels = document.querySelectorAll('.panel');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  panels.forEach(p => observer.observe(p));

  // ===== SMOOTH SCROLL FOR DOWN ARROW =====
  const down = document.querySelector('.down-arrow');
  if (down) {
    down.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector('#about');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== COLLAPSIBLE SECTIONS =====
  document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(btn => {
      btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        content.classList.toggle('show');
      });
    });
  });
})();
