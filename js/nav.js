(function () {
  // ---------- TEMPLATES ----------
  var PUBLIC_LINKS = [
    { key: "home",     href: "index.html",    label: "Home" },
    { key: "ourstory", href: "ourstory.html", label: "Our Story" },
    { key: "menu",     href: "menu.html",     label: "Menu" },
    { key: "booking",  href: "booking.html",  label: "Dining" },
    { key: "events",   href: "events.html",   label: "Events" },
    { key: "library",  href: "library.html",  label: "Library" },
    { key: "contact",  href: "contact.html",  label: "Contact" }
  ];

  var ADMIN_LINKS = [
    { key: "dashboard", href: "admin.html",         label: "Dashboard" },
    { key: "orders",    href: "admin-order.html",   label: "Orders" },
    { key: "manage",    href: "admin-manage.html",  label: "Manage" },
    { key: "messages",  href: "admin-contact.html", label: "Messages" },
    { key: "bookings",  href: "admin-booking.html", label: "Bookings" }
  ];

  var CART_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">' +
    '<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>' +
    '</svg>';

  var ORDERS_SVG =
    '<svg class="orders-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M6 2h12v20H8a2 2 0 0 1-2-2V2z"/>' +
    '<path d="M6 2a3 3 0 0 0 0 6h3"/>' +
    '<line x1="10" y1="8" x2="16" y2="8"/>' +
    '<line x1="10" y1="12" x2="16" y2="12"/>' +
    '<line x1="10" y1="16" x2="16" y2="16"/>' +
    '</svg>';

  var PROFILE_SVG =
    '<svg class="profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="12" cy="12" r="10"></circle>' +
    '<circle cx="12" cy="8" r="3"></circle>' +
    '<path d="M6 18c1.5-3 10.5-3 12 0"></path>' +
    '</svg>';

  var LOGOUT_SVG =
    '<svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>' +
    '<polyline points="16 17 21 12 16 7"/>' +
    '<line x1="21" y1="12" x2="9" y2="12"/>' +
    '</svg>';

  function buildLinks(links, activeKey) {
    return links.map(function (l) {
      var cls = (l.key === activeKey) ? ' class="active"' : "";
      return '<li><a href="' + l.href + '"' + cls + '>' + l.label + '</a></li>';
    }).join("");
  }

  // NOTE: Hamburger + icons are OUTSIDE #nav-links so they always show in the
  // navbar row. #nav-links holds ONLY the page links and is what toggles open.
  function buildPublicNav(activeKey) {
    return '' +
      '<nav>' +
        '<div class="logo"></div>' +
        '<ul id="nav-links">' +
          buildLinks(PUBLIC_LINKS, activeKey) +
        '</ul>' +
        '<ul class="nav-actions">' +
          '<li class="menu-toggle-item">' +
            '<button type="button" class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">☰</button>' +
          '</li>' +
          '<li class="cart-item">' +
            '<a href="cart.html" class="cart-link" title="Cart">' +
              CART_SVG +
              '<span id="cart-count" class="cart-count">0</span>' +
            '</a>' +
          '</li>' +
          '<li class="orders-item">' +
            '<a href="my-orders.html" class="orders-link" title="My Orders">' +
              ORDERS_SVG +
            '</a>' +
          '</li>' +
          '<li class="profile-item">' +
            '<button id="profileBtn" class="profile-btn" title="Login">' +
              PROFILE_SVG +
            '</button>' +
          '</li>' +
          '<li class="logout-item" style="display:none">' +
            '<button id="logoutBtn" class="logout-btn" title="Logout">' +
              LOGOUT_SVG +
              '<span class="logout-text"></span>' +
            '</button>' +
          '</li>' +
        '</ul>' +
      '</nav>';
  }

  function buildAdminNav(activeKey) {
    return '' +
      '<nav>' +
        '<div class="logo"></div>' +
        '<ul id="nav-links">' +
          buildLinks(ADMIN_LINKS, activeKey) +
        '</ul>' +
        '<ul class="nav-actions">' +
          '<li class="menu-toggle-item">' +
            '<button type="button" class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">☰</button>' +
          '</li>' +
          '<li class="logout-item">' +
            '<button id="logoutBtn" class="logout-btn" title="Logout">' +
              LOGOUT_SVG +
              '<span class="logout-text"></span>' +
            '</button>' +
          '</li>' +
        '</ul>' +
      '</nav>';
  }

  // ---------- CART COUNT ----------
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
      el.style.display = count > 0 ? "" : "none";
    } catch (e) { /* ignore */ }
  }
  window.updateCartCount = updateCartCount;

// ---------- LOGIN / LOGOUT TOGGLE ----------

function setAuthUI(loggedIn) {
  var profileLi = document.querySelector(".profile-item");
  var logoutLi  = document.querySelector(".logout-item");
  if (profileLi) profileLi.style.display = loggedIn ? "none" : "";
  if (logoutLi)  logoutLi.style.display  = loggedIn ? "" : "none";
}

function applyAuthState() {
  // 1) Fast initial paint from cache (avoids flicker before Firebase responds)
  setAuthUI(localStorage.getItem("isLoggedIn") === "true");

  // 2) Profile button -> login page
  var profileBtn = document.getElementById("profileBtn");
  if (profileBtn && !profileBtn.dataset.wired) {
    profileBtn.dataset.wired = "1";
    profileBtn.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }

  // 3) Logout button -> Firebase signOut + redirect
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn && !logoutBtn.dataset.wired) {
    logoutBtn.dataset.wired = "1";
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      Promise.all([
        import("./firebase.js"),
        import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js")
      ]).then(function (mods) {
        return mods[1].signOut(mods[0].auth);
      }).catch(function () {})
        .finally(function () {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "index.html";
        });
    });
  }

  // 4) Real Firebase auth state - single source of truth
  if (!window.__navAuthListenerBound) {
    window.__navAuthListenerBound = true;
    Promise.all([
      import("./firebase.js"),
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js")
    ]).then(function (mods) {
      mods[1].onAuthStateChanged(mods[0].auth, function (user) {
        var loggedIn = !!user;
        if (loggedIn) localStorage.setItem("isLoggedIn", "true");
        else localStorage.removeItem("isLoggedIn");
        setAuthUI(loggedIn);
      });
    }).catch(function () {});
  }
}
window.applyAuthState = applyAuthState;

  // ---------- HAMBURGER ----------
  function toggleMenu() {
    var navLinks  = document.getElementById("nav-links");
    var toggleBtn = document.getElementById("menuToggle") ||
                    document.querySelector(".menu-toggle");
    if (!navLinks || !toggleBtn) return;

    var willOpen = !navLinks.classList.contains("show");
    navLinks.classList.toggle("show", willOpen);
    toggleBtn.textContent = willOpen ? "✖" : "☰";
    toggleBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    document.body.classList.toggle("menu-open", willOpen);
  }
  window.toggleMenu = toggleMenu;
  window.__navToggleMenu = toggleMenu;

  function wireHamburger() {
    var btn = document.getElementById("menuToggle");
    if (btn && !btn.dataset.menuBound) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      });
      btn.dataset.menuBound = "1";
    }
    // Close menu when a page link is clicked (mobile UX) and guarantee navigation
    var links = document.querySelectorAll("#nav-links a");
    links.forEach(function (a) {
      if (a.dataset.navClose) return;
      a.dataset.navClose = "1";
      a.addEventListener("click", function (ev) {
        var href = a.getAttribute("href");
        var navLinks = document.getElementById("nav-links");
        if (navLinks && navLinks.classList.contains("show")) {
          // Close menu without blocking the link's default navigation
          navLinks.classList.remove("show");
          document.body.classList.remove("menu-open");
          var btn = document.getElementById("menuToggle");
          if (btn) {
            btn.textContent = "☰";
            btn.setAttribute("aria-expanded", "false");
          }
        }
        // Bulletproof navigation fallback for mobile menu items
        // (e.g. Messages / Bookings) in case anything cancels the default.
        if (href && !ev.defaultPrevented &&
            !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && ev.button === 0) {
          setTimeout(function () {
            try {
              if (location.href.indexOf(href) === -1) {
                window.location.href = href;
              }
            } catch (e) { /* ignore */ }
          }, 50);
        }
      });
    });
  }

  // Bulletproof delegated handler — works on every page even if the
  // navbar is re-rendered or another script swallows the direct listener.
  if (!document.__menuToggleDelegated) {
    document.__menuToggleDelegated = true;
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t) return;
      var btn = t.closest && t.closest("#menuToggle, .menu-toggle");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    // Close dropdown when clicking outside the navbar on mobile
    document.addEventListener("click", function (e) {
      var navLinks = document.getElementById("nav-links");
      if (!navLinks || !navLinks.classList.contains("show")) return;
      if (e.target.closest && (e.target.closest("nav") || e.target.closest(".menu-toggle"))) return;
      toggleMenu();
    });
  }

  // ---------- RENDER ----------
  function render() {
    var mount = document.getElementById("site-nav");
    if (!mount) return;
    var variant  = mount.getAttribute("data-variant") || "public";
    var activeKey = mount.getAttribute("data-page") || "";
    mount.outerHTML = (variant === "admin")
      ? buildAdminNav(activeKey)
      : buildPublicNav(activeKey);

    updateCartCount();
    applyAuthState();
    wireHamburger();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }

  window.addEventListener("storage", function (e) {
    if (e.key === "cart") updateCartCount();
    if (e.key === "isLoggedIn") applyAuthState();
  });
})();
