const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ===== PARTICLES (PHOTONS / IDEAS) ===== */
const particles = [];
const count = 120;

for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

/* ===== WAVE ===== */
let t = 0;

function drawWave() {
  ctx.beginPath();
  for (let x = 0; x < w; x += 10) {
    const y = h / 2 + Math.sin(x * 0.01 + t) * 40;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "rgba(100,255,218,0.15)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ===== ANIMATION LOOP ===== */
function animate() {
  ctx.clearRect(0, 0, w, h);

  // particles
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(100,255,218,0.6)";
    ctx.fill();
  });

  // wave
  drawWave();
  t += 0.02;

  requestAnimationFrame(animate);
}

animate();
