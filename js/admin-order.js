import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
onSnapshot,
doc,
updateDoc,
deleteDoc,
addDoc
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


/* ================= INCOMING ORDERS ================= */

const ordersContainer = document.getElementById("ordersContainer");

onSnapshot(collection(db,"orders"), snapshot=>{

ordersContainer.innerHTML="";

snapshot.forEach(docSnap=>{

const order = docSnap.data();
const id = docSnap.id;

let itemsHTML="";

order.items.forEach(item=>{
itemsHTML += `
<li>
  ${item.name} (${item.size || "M"})
  <br>
  <small>
    ${item.sugar || "Normal"} • ${item.strength || "Light"}
  </small>
  <br>
  x ${item.qty}
</li>`;
});

ordersContainer.innerHTML += `

<div class="order-card">

<h3>${order.customerName}</h3>

<p><b>Phone:</b> ${order.phoneNumber || "-"}</p>

<p><b>Table:</b> ${order.tableNumber}</p>

<p><b>Order Type:</b> ${order.orderType}</p>

<p><b>Payment:</b> ${order.paymentMethod}</p>

<p><b>Total:</b> ₹${order.total}</p>

<span class="status-badge status-${order.status}">${order.status}</span>

<b>Items:</b>

<ul>${itemsHTML}</ul>

<div class="status-buttons">

<button onclick="updateStatus('${id}','preparing')">
Preparing
</button>

<button onclick="updateStatus('${id}','ready')">
Ready
</button>

<button onclick="serveOrder('${id}')">
Served
</button>

</div>

</div>

`;

});

});


/* ================= UPDATE STATUS ================= */

window.updateStatus = async function(id,status){

const ref = doc(db,"orders",id);

await updateDoc(ref,{
status:status
});

};


/* ================= SERVE ORDER ================= */

window.serveOrder = async function(id){

const ref = doc(db,"orders",id);

const snapshot = await fetchOrder(ref);

await addDoc(collection(db,"orderHistory"),snapshot);

await deleteDoc(ref);

};


async function fetchOrder(ref){

const { getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

const snap = await getDoc(ref);

return snap.data();

}


/* ================= HISTORY ================= */

const historyContainer = document.getElementById("historyContainer");

onSnapshot(collection(db,"orderHistory"), snapshot=>{

historyContainer.innerHTML="";

snapshot.forEach(docSnap=>{

const order = docSnap.data();
const id = docSnap.id;

let itemsHTML="";

order.items.forEach(item=>{
itemsHTML += `
  <li>
    ${item.name} (${item.size || "M"}) x ${item.qty}
    <br>
    <small>
      Sugar: ${item.sugar || "Normal"} | 
      Strength: ${item.strength || "Light"}
    </small>
  </li>
`;
});

historyContainer.innerHTML += `

<div class="order-card">

<h3>${order.customerName}</h3>

<p><b>Phone:</b> ${order.phoneNumber || "-"}</p>

<p><b>Table:</b> ${order.tableNumber}</p>

<p><b>Total:</b> ₹${order.total}</p>

<p><b>Payment:</b> ${order.paymentMethod}</p>

<b>Items:</b>

<ul>${itemsHTML}</ul>

<button onclick="deleteHistory('${id}')" class="delete-btn">
Delete
</button>

</div>

`;

});

});


/* ================= DELETE HISTORY ================= */

window.deleteHistory = async function(id){

await deleteDoc(doc(db,"orderHistory",id));

};