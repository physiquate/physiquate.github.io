// Get the current script's path (footer-loader.js)
const scriptPath = document.currentScript.src;
// Derive footer.html path by replacing "footer-loader.js" with "footer.html"
const footerPath = scriptPath.replace("footer-loader.js", "footer.html");

fetch(footerPath)
  .then(res => res.text())
  .then(html => {
    // Determine project root URL (remove "common/footer-loader.js" from script path)
    const rootUrl = scriptPath.replace("common/footer-loader.js", "");

    // Fix relative links (href="../...") if any exist in footer in future
    html = html.replaceAll('href="../', `href="${rootUrl}`);

    document.getElementById("footer").innerHTML = html;
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })
  .catch(err => console.error("Footer load failed:", err));
