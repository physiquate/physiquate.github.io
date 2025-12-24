// ===== SMART FOOTER LOADER =====

const currentPath = window.location.pathname;
const parts = currentPath.split("/").filter(p => p.length > 0);
const rootIndex = parts.indexOf("AAI_ATC");

let prefix = "";
if (rootIndex !== -1) {
  for (let i = rootIndex + 1; i < parts.length - 1; i++) {
    prefix += "../";
  }
}

fetch(prefix + "common/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  })
  .catch(err => console.error("Footer load failed:", err));
