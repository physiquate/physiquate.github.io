// ===== script.js =====
// Simple scripts: mobile nav toggle, reveal on scroll, set year

(function(){  // ← Immediately Invoked Function Expression (IIFE) to avoid polluting global scope

  // --- NAV TOGGLE (for mobile menu) ---
  var toggle = document.querySelector('.nav-toggle');  // Selects the hamburger / toggle button
  var links = document.querySelector('.nav-links');    // Selects the navigation link container

  if(toggle){  // Only run if toggle button exists
    toggle.addEventListener('click', function(){       // When the toggle button is clicked
      if(links.style.display === 'flex')               // If links are already visible
        links.style.display = 'none';                  // Hide them
      else 
        links.style.display = 'flex';                  // Otherwise, show them
    });
  }


  // --- SET YEAR (for footer or copyright text) ---
  var yearEl = document.getElementById('year');        // Gets the element with ID "year"
  if(yearEl)                                           // If found
    yearEl.textContent = new Date().getFullYear();     // Replace its text with the current year (e.g. 2025)


  // --- REVEAL ON SCROLL (animation when panels come into view) ---
  var panels = document.querySelectorAll('.panel');    // Selects all elements with class "panel"

  // Create an IntersectionObserver to detect when panels appear in viewport
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){                        // If the element is visible in viewport
        entry.target.classList.add('visible');         // Add "visible" class (CSS handles animation)
      }
    });
  }, {threshold:0.12});                                // Trigger when 12% of element is visible

  panels.forEach(function(p){ io.observe(p); });        // Observe all panels


  // --- OPTIONAL: Down arrow click (scrolls to #about section smoothly) ---
  var down = document.querySelector('.down-arrow');    // Select the "down arrow" link
  if(down){
    down.addEventListener('click', function(e){
      e.preventDefault();                              // Stop normal link behavior
      var target = document.querySelector('#about');   // Target the section with ID "about"
      if(target)
        target.scrollIntoView({behavior:'smooth'});    // Scroll smoothly to that section
    });
  }
  // Expand first collapsible on page load
const firstContent = document.querySelector(".collapsible + .content");
if (firstContent) {
  firstContent.style.maxHeight = firstContent.scrollHeight + "px";
}


})();  // ← End of IIFE (script runs automatically when loaded)
