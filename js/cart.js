/* ================= FIREBASE ================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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

const auth = getAuth(app);


/* ================= LOAD CART ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

function loadCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceEl.textContent = 0;
    return;
  }
  cart.forEach((item, index) => {
    const price = item.price || 100;  
    const itemTotal = price * item.qty;
    total += itemTotal;
   cartContainer.innerHTML += `

<div class="cart-item">

  <div class="cart-left">
    <img src="${item.img}" alt="${item.name}">

    <div class="cart-info">

      <h3>
        ${item.name} 
        ${item.size ? `(${item.size[0]})` : ""}
      </h3>

      ${
        item.sugar || item.strength
        ? `<p>
            ${item.sugar || ""}${item.sugar && item.strength ? " • " : ""}${item.strength || ""}
          </p>`
        : ""
      }

    </div>
  </div>

  <div class="cart-middle">
    <div class="qty-control">
      <button onclick="decreaseQty(${index})">-</button>
      <span>${item.qty}</span>
      <button onclick="increaseQty(${index})">+</button>
    </div>
  </div>

  <div class="cart-right">
    ₹${itemTotal}
  </div>

</div>

`;

  });

  totalPriceEl.textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart));
  if (window.updateCartCount) window.updateCartCount();
}


/* ================= QUANTITY CONTROLS ================= */

window.increaseQty = function(index) {
  cart[index].qty += 1;
  loadCart();
};


window.decreaseQty = function(index) {
  cart[index].qty -= 1;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  loadCart();

};


/* ================= PLACE ORDER ================= */

const placeOrderBtn = document.getElementById("placeOrderBtn");
placeOrderBtn.addEventListener("click", async () => {
  const user = auth.currentUser || null;
  const customerName = document.getElementById("customerName").value;
  const tableNumber = document.getElementById("tableNumber").value;
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const orderType = document.getElementById("orderType").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  const total = totalPriceEl.textContent;
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  if (!customerName) {
    alert("Please enter your name");
    return;
  }

  if (!phoneNumber) {
    alert("Please enter your phone number");
    return;
  }
  // basic phone validation: 7-15 digits (ignoring spaces / + / -)
  const phoneDigits = phoneNumber.replace(/[^0-9]/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    alert("Please enter a valid phone number");
    return;
  }

  try {
    await addDoc(collection(db, "orders"), {
      userId: user ? user.uid : "guest",
      email: user ? user.email : "guest",
      customerName: customerName,
      phoneNumber: phoneNumber,
      tableNumber: orderType === "takeaway" ? "" : tableNumber,
      orderType: orderType,
      paymentMethod: paymentMethod,
      items: cart,
      total: total,
      status: "pending",
      createdAt: Timestamp.now()
    });

    localStorage.removeItem("cart");
    if (window.updateCartCount) window.updateCartCount();
    showSuccessPopup();
  } catch (error) {
    console.error(error);
    alert("Order failed");
  }

});

function showSuccessPopup(){
  document.getElementById("successPopup").classList.add("active");
}

window.closePopup = function(){
  document.getElementById("successPopup").classList.remove("active");
}

window.goHome = function(){
  window.location.href = "../structure/menu.html";
}

/* ================= INIT ================= */

loadCart();