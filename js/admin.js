import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
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
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = "svkarthigeyan@gmail.com";


/* 🔐 Protect Admin Page */
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "../structure/index.html";
    return;
  }

  if (user.email.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase().trim()) {
    window.location.href = "../structure/home.html";
    return;
  }

  // If admin → load dashboard data
  loadDashboardData();
});


/* ================= DASHBOARD COUNTS ================= */

function loadDashboardData() {

  // USERS (count from Firestore "users" collection)
  onSnapshot(collection(db, "users"), (snapshot) => {
    document.getElementById("usersCount").textContent = snapshot.size;
  });

  // MENU
  onSnapshot(collection(db, "menu"), (snapshot) => {
    document.getElementById("menuCount").textContent = snapshot.size;
  });

  // EVENTS
  onSnapshot(collection(db, "events"), (snapshot) => {
    document.getElementById("eventsCount").textContent = snapshot.size;
  });

  // LIBRARY
  onSnapshot(collection(db, "library"), (snapshot) => {
    document.getElementById("libraryCount").textContent = snapshot.size;
  });

}


/* ================= LOGOUT ================= */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "../structure/index.html";
    });
  });
}