fetch("../common/footer.html")
  .then(res=>res.text())
  .then(html=>{
    document.getElementById("footer").innerHTML = html;
    const yearEl = document.getElementById("year");
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  })
  .catch(err=>console.error("Footer load failed:", err));
