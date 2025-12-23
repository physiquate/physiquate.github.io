const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =========================
   WARP SPEED STAR FIELD
========================= */
const stars = [];
const COUNT = 900;

for (let i = 0; i < COUNT; i++) {
  stars.push(newStar());
}

function newStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    speed: Math.random() * 8 + 3,
    color: pickColor()
  };
}

function pickColor() {
  const c = [
    "rgba(120,180,255,0.8)",
    "rgba(200,140,255,0.7)",
    "rgba(120,255,220,0.7)",
    "rgba(255,180,120,0.6)"
  ];
  return c[Math.floor(Math.random() * c.length)];
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (const s of stars) {
    s.z -= s.speed;

    if (s.z <= 0) {
      Object.assign(s, newStar(), { z: canvas.width });
    }

    const px = (s.x - cx) * (canvas.width / s.z) + cx;
    const py = (s.y - cy) * (canvas.width / s.z) + cy;
    const size = (1 - s.z / canvas.width) * 2;

    ctx.beginPath();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = size;
    ctx.moveTo(px, py);
    ctx.lineTo(px + size * 4, py);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

animate();
