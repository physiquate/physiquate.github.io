/**************************************
 * CONFIGURATION
 **************************************/
const PARTICLE_DENSITY = 1;

// Logo settings
const LOGO_SCALE = 0.07;
const LOGO_BREATH_SPEED = 0.005;
const LOGO_BREATH_AMP = 0.05;
const LOGO_MOVE_SPEED = 0.02;
const LOGO_MOVE_AMP = 0.5;

// Sphere settings
const SPHERE_RADIUS = 5.0;
const SPHERE_BREATH_SPEED = 0.01;
const SPHERE_BREATH_AMP = 0.05;
const SPHERE_MOVE_SPEED = 0.05;
const SPHERE_MOVE_AMP = 1.0;

// Colors & rotation
const COLOR_FRONT = 0x00f0ff;
const COLOR_BACK = 0xff0055;
const ROTATION_SPEED = 0.004;


/**************************************
 * GLOBALS
 **************************************/
let scene, camera, renderer, particleSystem;
let container;


/**************************************
 * INITIALIZATION
 **************************************/
function initThree() {
    container = document.querySelector("#canvas-container");
    if (!container) {
        console.error("ERROR: .hero-img not found.");
        return;
    }

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.05);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 15;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    resizeRenderer(); // fit hero

    // Load logo
    loadLogoAndCreateParticles();

    // Resize events
    window.addEventListener("resize", resizeRenderer);
}


/**************************************
 * RESIZE HANDLER
 **************************************/
function resizeRenderer() {
    if (!renderer || !camera || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
}


/**************************************
 * LOAD LOGO & EXTRACT PARTICLES
 **************************************/
function loadLogoAndCreateParticles() {
    const img = new Image();
    img.src = "logo.png";

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = 200 / Math.max(img.width, img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const positions = [];
        const colors = [];

        for (let y = 0; y < canvas.height; y += PARTICLE_DENSITY) {
            for (let x = 0; x < canvas.width; x += PARTICLE_DENSITY) {
                const i = (y * canvas.width + x) * 4;
                const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

                const bright = (r + g + b) / 3;
                if (a > 128 && bright < 128) {
                    const pX = (x - canvas.width / 2) * LOGO_SCALE;
                    const pY = -(y - canvas.height / 2) * LOGO_SCALE;
                    const pZ = (Math.random() - 0.5) * 2.0;

                    positions.push(pX, pY, pZ);
                    colors.push(1, 1, 1);
                }
            }
        }

        // Generate sphere positions
        const spherePositions = [];
        const count = positions.length / 3;

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const sx = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
            const sy = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
            const sz = SPHERE_RADIUS * Math.cos(phi);

            spherePositions.push(sx, sy, sz);
        }

        createParticleSystem(positions, colors, spherePositions);
    };

    img.onerror = () => console.error("ERROR: Could not load logo.png");
}


/**************************************
 * CREATE PARTICLE SYSTEM
 **************************************/
function createParticleSystem(positions, colors, spherePositions) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    geometry.userData.original = positions.slice();
    geometry.userData.sphere = spherePositions;
    geometry.userData.count = positions.length / 3;

    const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    animate();
}


/**************************************
 * ANIMATION LOOP
 **************************************/
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 1;

    if (!particleSystem) return;

    const pos = particleSystem.geometry.attributes.position.array;
    const col = particleSystem.geometry.attributes.color.array;
    const orig = particleSystem.geometry.userData.original;
    const sph = particleSystem.geometry.userData.sphere;
    const count = particleSystem.geometry.userData.count;

    const colorFront = new THREE.Color(COLOR_FRONT);
    const colorBack = new THREE.Color(COLOR_BACK);
    const temp = new THREE.Color();

    const angle = time * ROTATION_SPEED;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    let wave = -Math.cos(angle * 2);
    let morph = Math.max(0, Math.min(1, wave * 1.5 + 0.5));

    const breathLogo = 1 + Math.sin(time * LOGO_BREATH_SPEED) * LOGO_BREATH_AMP;
    const breathSphere = 1 + Math.sin(time * SPHERE_BREATH_SPEED) * SPHERE_BREATH_AMP;
    const breath = breathLogo + (breathSphere - breathLogo) * morph;

    const moveSpeed = LOGO_MOVE_SPEED + (SPHERE_MOVE_SPEED - LOGO_MOVE_SPEED) * morph;
    const moveAmp = LOGO_MOVE_AMP + (SPHERE_MOVE_AMP - LOGO_MOVE_AMP) * morph;

    for (let i = 0; i < count; i++) {
        const idx = i * 3;

        let lx = orig[idx], ly = orig[idx + 1], lz = orig[idx + 2];
        let sx = sph[idx], sy = sph[idx + 1], sz = sph[idx + 2];

        let xB = lx + (sx - lx) * morph;
        let yB = ly + (sy - ly) * morph;
        let zB = lz + (sz - lz) * morph;

        const xR = xB * cosA - zB * sinA;
        const zR = xB * sinA + zB * cosA;

        const pulse = Math.sin(time * moveSpeed + i * 0.05) * moveAmp;
        const scale = breath * (1 + pulse * 0.05);

        const xF = xR * scale;
        const yF = yB * scale;
        const zF = zR * scale;

        pos[idx] = xF;
        pos[idx + 1] = yF;
        pos[idx + 2] = zF;

        const zNorm = (zF + 4) / 8;
        const t = Math.max(0, Math.min(1, zNorm));
        temp.copy(colorBack).lerp(colorFront, t);

        col[idx] = temp.r;
        col[idx + 1] = temp.g;
        col[idx + 2] = temp.b;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
}


/**************************************
 * START
 **************************************/
window.onload = initThree;
