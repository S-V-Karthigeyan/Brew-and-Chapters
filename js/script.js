/* ================= MOBILE MENU =================
 * The actual toggle implementation lives in nav.js (so it works even
 * when nav.js renders the navbar after DOMContentLoaded).
 * Here we keep a backwards-compatible global toggleMenu() and a
 * delegated click handler so a hamburger added at any time keeps
 * working — including pages that don't load nav.js. */

function toggleMenu() {
  // Prefer the implementation from nav.js if it has loaded.
  if (window.__navToggleMenu) return window.__navToggleMenu();

  const navLinks = document.getElementById("nav-links");
  const toggleBtn = document.querySelector(".menu-toggle");
  if (!navLinks || !toggleBtn) return;

  const willOpen = !navLinks.classList.contains("show");
  navLinks.classList.toggle("show", willOpen);
  toggleBtn.textContent = willOpen ? "✖" : "☰";
  toggleBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
  document.body.classList.toggle("menu-open", willOpen);
}

/* Delegated click handler — works no matter when .menu-toggle appears
   in the DOM (injected by nav.js, static HTML, etc.). */
document.addEventListener("click", function (e) {
  const target = e.target.closest(".menu-toggle");
  if (!target) return;
  e.preventDefault();
  toggleMenu();
});


/* ================= LOADER (SHOW ONLY ONCE) ================= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (!loader) return;

  // If already shown → skip
  if (sessionStorage.getItem("loaderShown")) {
    loader.style.display = "none";
    return;
  }

  // Show loader first time
  setTimeout(() => {

    loader.classList.add("hide");

    // Save state
    sessionStorage.setItem("loaderShown", true);

    setTimeout(() => {
      loader.remove();
    }, 800);

  }, 1200); // ⬅️ Reduced time (better UX)

});

function openModal(image, title) {
  document.getElementById("productModal").style.display = "block";
  document.getElementById("modalImage").src = image;
  document.getElementById("modalTitle").innerText = title;
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

/* CLOSE ON OUTSIDE CLICK */
window.onclick = function(event) {
  let modal = document.getElementById("productModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
