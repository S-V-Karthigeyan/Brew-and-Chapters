/* ================= GLOBAL HEADER LOGIC =================
 * Loaded on every page that has the site header.
 * - Keeps #cart-count in sync with localStorage on every page
 * - Updates badge live when cart changes in another tab/page
 * - Wires header icon clicks (cart, orders) defensively so they
 *   still work if some other script throws earlier on the page.
 * ======================================================= */

(function () {
  function updateCartCount() {
    try {
      var el = document.getElementById("cart-count");
      if (!el) return;
      var cart = JSON.parse(localStorage.getItem("cart") || "[]");
      var count = 0;
      if (Array.isArray(cart)) {
        cart.forEach(function (i) {
          count += (i && typeof i.qty === "number") ? i.qty : 1;
        });
      }
      el.textContent = count;
    } catch (e) {
      /* ignore malformed cart */
    }
  }

  function wireHeader() {
    updateCartCount();

    // Defensive click handlers: if anchor href is missing/broken,
    // still navigate to the right page.
    var cartLink = document.querySelector(".cart-item .cart-link");
    if (cartLink && !cartLink.getAttribute("href")) {
      cartLink.setAttribute("href", "cart.html");
    }
    var ordersLink = document.querySelector(".orders-item .orders-link");
    if (ordersLink && !ordersLink.getAttribute("href")) {
      ordersLink.setAttribute("href", "my-orders.html");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireHeader);
  } else {
    wireHeader();
  }

  // Live update across tabs / after cart.js writes
  window.addEventListener("storage", function (e) {
    if (e.key === "cart") updateCartCount();
  });

  // Expose so other scripts (cart.js) can call after mutating cart
  window.updateCartCount = updateCartCount;
})();
