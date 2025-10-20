// ===== script.js =====
// This script handles navigation toggle, scroll animations, and footer year

(function () { // IIFE → runs automatically to avoid polluting global scope

  // --- NAV TOGGLE (for mobile menu) ---
  var toggle = document.querySelector('.nav-toggle');  // Selects ☰ toggle button
  var menu = document.querySelector('.nav-menu');      // Selects navigation menu (<ul>)

  // Run only if both elements exist
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      // Adds or removes the "active" class (for showing/hiding mobile menu)
      menu.classList.toggle('active');  // Toggle visibility
    });
  }

  // --- SET YEAR (for footer) ---
  var yearEl = document.getElementById('year');        // Finds element with id="year"
  if (yearEl) yearEl.textContent = new Date().getFullYear(); // Sets current year (e.g., 2025)

  // --- REVEAL ON SCROLL (simple fade-in animation) ---
  var panels = document.querySelectorAll('.panel');    // Selects all .panel sections

  // IntersectionObserver detects when elements appear in viewport
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {                      // If panel enters view
        entry.target.classList.add('visible');         // Add .visible → triggers CSS animation
      }
    });
  }, { threshold: 0.12 });                             // Trigger when 12% visible

  panels.forEach(function (p) { io.observe(p); });     // Observe all panels

  // --- SMOOTH SCROLL FOR DOWN ARROW ---
  var down = document.querySelector('.down-arrow');    // Select ⌄ icon link
  if (down) {
    down.addEventListener('click', function (e) {
      e.preventDefault();                              // Prevent jumpy default
      var target = document.querySelector('#about');   // Target the About section
      if (target) target.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
    });
  }
    // ===== COLLAPSIBLE SECTIONS =====
  document.addEventListener("DOMContentLoaded", function() {
    const collapsibles = document.querySelectorAll(".collapsible");
    
    collapsibles.forEach(button => {
      button.addEventListener("click", function() {
        this.classList.toggle("active");
        
        const content = this.nextElementSibling;
        content.classList.toggle("show");
      });
    });
  });


})(); // ← End of IIFE
