// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

  // ✅ NAV MENU TOGGLE
  window.toggleMenu = function () {
    document.getElementById("nav-links").classList.toggle("show");
  };

  // ✅ ELEMENTS
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const buttons = document.querySelectorAll(".bar button");

  // ================= SEARCH =================
  searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();

    // 🔥 ALWAYS FETCH UPDATED BOOKS
    const books = document.querySelectorAll(".container img");

    let visibleCount = 0;

    books.forEach(book => {
      const title = book.alt.toLowerCase();

      if (title.includes(filter)) {
        book.style.display = "block";
        visibleCount++;
      } else {
        book.style.display = "none";
      }
    });

    // NO RESULTS
    if (visibleCount === 0 && filter !== "") {
      noResults.style.display = "flex";
    } else {
      noResults.style.display = "none";
    }

    // REMOVE CATEGORY ACTIVE
    buttons.forEach(btn => btn.classList.remove("active"));
  });

  // ================= FILTER =================
  window.filterBooks = function (category, btn) {

    const books = document.querySelectorAll(".container img");

    let visibleCount = 0;

    // ACTIVE BUTTON
    buttons.forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    books.forEach(book => {
      const bookCategory = book.getAttribute("data-category");

      if (category === "all" || bookCategory === category) {
        book.style.display = "block";
        visibleCount++;
      } else {
        book.style.display = "none";
      }
    });

    // CLEAR SEARCH
    searchInput.value = "";

    // NO RESULTS
    if (visibleCount === 0) {
      noResults.style.display = "flex";
    } else {
      noResults.style.display = "none";
    }
  };

});


// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXSnukZm-1AvQZ7z9JsmJDUrlWtP1Y4aY",
  authDomain: "brew-and-chapters.firebaseapp.com",
  projectId: "brew-and-chapters",
  storageBucket: "brew-and-chapters.firebasestorage.app",
  messagingSenderId: "542206853478",
  appId: "1:542206853478:web:024ac297bb6e85dd7908a7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 TARGET SAME CONTAINER
const container = document.querySelector(".library-books");

// ================= LOAD FIREBASE BOOKS =================
onSnapshot(collection(db, "library"), (snapshot) => {

  // 🔥 REMOVE OLD FIREBASE BOOKS
  const oldBooks = container.querySelectorAll(".firebase-book");
  oldBooks.forEach(el => el.remove());

  snapshot.forEach(doc => {
    const data = doc.data();

    const img = document.createElement("img");

    img.src = data.image || "../image/default.jpg";
    img.alt = data.name || "book";

    // 🔥 USE REAL CATEGORY (IMPORTANT)
    img.setAttribute("data-category", data.category || "all");

    img.classList.add("firebase-book");

    // 🔥 INSERT WITHOUT BREAKING GRID
    const firstBook = container.querySelector("img");

    if (firstBook) {
      container.insertBefore(img, firstBook);
    } else {
      container.appendChild(img);
    }
  });

});