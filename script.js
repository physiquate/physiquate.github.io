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
