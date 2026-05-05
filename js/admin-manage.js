import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* ================= MENU ================= */

// ADD MENU
window.addMenu = async () => {

  const name = document.getElementById("menuName").value;
  const desc = document.getElementById("menuDesc").value;
  const category = document.getElementById("menuCategory").value;

  const price = document.getElementById("menuPrice").value;

  const small = document.getElementById("sizeSmall").value;
  const medium = document.getElementById("sizeMedium").value;
  const large = document.getElementById("sizeLarge").value;

  const sugarInput = document.getElementById("menuSugar").value;
  const strengthInput = document.getElementById("menuStrength").value;

  if (!name) {
    alert("Name required");
    return;
  }

  // ✅ FIXED IMAGE
  const imageUrl = "../image/default.jpg";

  let newItem = {
    name,
    desc,
    img: imageUrl,
    category   // ✅ VERY IMPORTANT
  };

  // ================= SIZES =================
  if (small || medium || large) {

    newItem.sizes = {};

    if (small) newItem.sizes.Small = Number(small);
    if (medium) newItem.sizes.Medium = Number(medium);
    if (large) newItem.sizes.Large = Number(large);

  } else if (price) {
    newItem.price = Number(price);
  }

  // ================= OPTIONS =================
  if (sugarInput || strengthInput) {

    newItem.options = {};

    if (sugarInput) {
      newItem.options.sugar = sugarInput
        .split(",")
        .map(s => s.trim())
        .filter(s => s);
    }

    if (strengthInput) {
      newItem.options.strength = strengthInput
        .split(",")
        .map(s => s.trim())
        .filter(s => s);
    }

    if (Object.keys(newItem.options).length === 0) {
      delete newItem.options;
    }
  }

  await addDoc(collection(db, "menu"), newItem);

  alert("Menu item added ✅");
};


// LOAD MENU + SHOW IMAGE
onSnapshot(collection(db, "menu"), (snapshot) => {
  const container = document.getElementById("menuList");
  container.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    container.innerHTML += `
      <div class="menu-item-card" style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">

        <img src="${data.img}" 
             style="width:50px;height:50px;object-fit:cover;border-radius:8px;">

        <span>${data.name}</span>

        <button onclick="deleteMenu('${docSnap.id}')">Delete</button>

      </div>
    `;
  });
});

window.deleteMenu = async (id) => {
  await deleteDoc(doc(db, "menu", id));
};



/* ================= EVENTS ================= */

// ADD EVENT
window.addEvent = async () => {
  const name = document.getElementById("eventName").value;
  const desc = document.getElementById("eventDesc").value;

  if (!name) return alert("Enter event name");

  const imageUrl = "../image/default.jpg";

  await addDoc(collection(db, "events"), {
    name,
    desc,
    image: imageUrl
  });

  alert("Event added ✅");
};


// LOAD EVENTS
onSnapshot(collection(db, "events"), (snapshot) => {
  const container = document.getElementById("eventList");
  container.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    container.innerHTML += `
      <div class="menu-item-card" style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">

        <img src="${data.image}" 
             style="width:50px;height:50px;object-fit:cover;border-radius:8px;">

        <span>${data.name}</span>

        <button onclick="deleteEvent('${docSnap.id}')">Delete</button>

      </div>
    `;
  });
});

window.deleteEvent = async (id) => {
  await deleteDoc(doc(db, "events", id));
};



/* ================= LIBRARY ================= */

// ADD BOOK
window.addBook = async () => {

  const name = document.getElementById("bookName").value;
  const author = document.getElementById("bookAuthor").value;
  const category = document.getElementById("bookCategory").value;

  if (!name) return alert("Enter book name");

  const imageUrl = "../image/default.jpg"; // 🔥 ensure image shows

  await addDoc(collection(db, "library"), {
    name,
    author,
    image: imageUrl,
    category
  });

  alert("Book added ✅");
};


// LOAD BOOKS
onSnapshot(collection(db, "library"), (snapshot) => {
  const container = document.getElementById("bookList");
  container.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    container.innerHTML += `
      <div class="menu-item-card" style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">

        <img src="${data.image}" 
             style="width:50px;height:50px;object-fit:cover;border-radius:8px;">

        <span>${data.name} - ${data.author}</span>

        <button onclick="deleteBook('${docSnap.id}')">Delete</button>

      </div>
    `;
  });
});

window.deleteBook = async (id) => {
  await deleteDoc(doc(db, "library", id));
};