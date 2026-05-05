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

const container = document.getElementById("eventsContainer"); // 🔥 IMPORTANT

onSnapshot(collection(db, "events"), (snapshot) => {

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    container.innerHTML += `
      <div class="event-card">
        <img src="${data.image || '../image/default.jpg'}">
        <h3>${data.name}</h3>
        <p>${data.desc}</p>
      </div>
    `;
  });

});
