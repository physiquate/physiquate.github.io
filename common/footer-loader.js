// Get the current script's path (footer-loader.js)
const scriptPath = document.currentScript.src;
// Derive footer.html path by replacing "footer-loader.js" with "footer.html"
const footerPath = scriptPath.replace("footer-loader.js", "footer.html");

fetch(footerPath)
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })
  .catch(err => console.error("Footer load failed:", err));
