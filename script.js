// === PARTICLE BACKGROUND FOR HERO SECTION ===
// Uses Three.js to generate floating particles

let scene, camera, renderer, particles;

function initParticles() {
  const container = document.getElementById("canvas-container");
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 60;

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.innerHTML = ""; // clear old canvas
  container.appendChild(renderer.domElement);

  // Particles
  const count = 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 250;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.5,
    transparent: true,
    opacity: 0.8
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  particles.rotation.x += 0.0006;
  particles.rotation.y += 0.0008;

  renderer.render(scene, camera);
}

// Resize to hero size only
function onResize() {
  const container = document.getElementById("canvas-container");
  if (!container) return;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onResize);


// Initialize after page load
window.addEventListener("load", initParticles);

// ===== COLLAPSIBLE / ACCORDION LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const coll = document.getElementsByClassName("collapsible");

  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});

// ===== SCROLL ANIMATION (Reveal Panels) =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    observer.observe(panel);
  });
});

// ===== COURSE CARD CLICK NAVIGATION =====
document.addEventListener("DOMContentLoaded", () => {

  const courseLinks = {
    "CSIR NET Physics": "../CSIR-NET/index.html",
    "GATE Physics": "../GATE/index.html",
    "AAI - ATC": "../AAI-ATC/index.html",
    "JEE": "../JEE/index.html",
    "NEET": "../NEET/index.html",
    "Quizzes & Notes": "../QUIZZES/index.html"
  };

  const courseSection = document.getElementById("Courses");
  if (!courseSection) return;

  const cards = courseSection.querySelectorAll(".about-card");

  cards.forEach(card => {
    const titleEl = card.querySelector("h3");
    if (!titleEl) return;

    const title = titleEl.innerText.trim();

    if (courseLinks[title]) {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        window.location.href = courseLinks[title];
      });
    }
  });

});

