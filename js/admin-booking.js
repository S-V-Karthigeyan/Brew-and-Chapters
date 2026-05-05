import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 SAME CONFIG
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

const container = document.getElementById("bookingContainer");

async function loadBookings() {
  container.innerHTML = "Loading...";

  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const card = document.createElement("div");
    card.classList.add("order-card");

    card.innerHTML = `
      <h3>${data.name}</h3>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      <p><b>Guests:</b> ${data.guests}</p>
      <p><b>Request:</b> ${data.requests || "None"}</p>

      <button class="delete-btn">Delete</button>
    `;

    // DELETE
    card.querySelector(".delete-btn").addEventListener("click", async () => {
      await deleteDoc(doc(db, "bookings", docSnap.id));
      loadBookings();
    });

    container.appendChild(card);
  });
}

loadBookings();