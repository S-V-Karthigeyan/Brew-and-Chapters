import { db, auth } from "./firebase.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔒 ADMIN PROTECTION
const ADMIN_EMAIL = "svkarthigeyan@gmail.com";

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "index.html";
  }
});

const container = document.getElementById("messagesContainer");

// 🔥 GET MESSAGES (LATEST FIRST)
const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {

  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const time = data.createdAt?.toDate().toLocaleString() || "Just now";

    container.innerHTML += `
      <div class="message-card">
        <h3>${data.name}</h3>
        <p><strong>Email:</strong> ${data.email}</p>
        <p>${data.message}</p>
        <p><small>${time}</small></p>
        <button class="delete-btn" onclick="deleteMessage('${docSnap.id}')">
          Delete
        </button>
      </div>
    `;
  });

});

// DELETE
window.deleteMessage = async (id) => {
  if (confirm("Delete this message?")) {
    await deleteDoc(doc(db, "messages", id));
  }
};