import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// FIREBASE CONFIG
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

// FORM
const form = document.getElementById("bookingForm");
const message = document.getElementById("message");

// PREVENT PAST DATE
const today = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").min = today;

// SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const bookingData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    time: formData.get("time"),
    guests: formData.get("guests"),
    requests: formData.get("requests"),
    createdAt: Timestamp.now()
  };

  try {
  await addDoc(collection(db, "bookings"), bookingData);

  message.textContent = "✅ Table booked successfully!";

  // optional: small delay so user sees message
  setTimeout(() => {
    window.location.href = "menu.html";
  }, 1500);

  form.reset();

} catch (error) {
  message.textContent = "❌ Error booking table";
  console.error(error);
}
});