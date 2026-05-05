import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
query,
where,
onSnapshot
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


const activeContainer = document.getElementById("activeOrders");
const historyContainer = document.getElementById("orderHistory");


auth.onAuthStateChanged(user=>{

  if(user){
    loadOrders(user.email);
  } else {
    loadOrders("guest");
  }

});


function loadOrders(email){

/* ACTIVE ORDERS */

const activeQuery = query(
collection(db,"orders"),
where("email","==",email)
);

onSnapshot(activeQuery,snapshot=>{

activeContainer.innerHTML="";

snapshot.forEach(doc=>{

const order = doc.data();

let itemsHTML="";

order.items.forEach(item=>{
itemsHTML += `<li>${item.name} x ${item.qty}</li>`;
});

activeContainer.innerHTML += `

<div class="order-card">

<h3>Table ${order.tableNumber}</h3>

<span class="status-badge status-${order.status}">
  ${order.status}
</span>

<p><b>Payment:</b> ${order.paymentMethod}</p>

<p><b>Total:</b> ₹${order.total}</p>

<ul>${itemsHTML}</ul>

</div>

`;

});

});


/* ORDER HISTORY */

const historyQuery = query(
collection(db,"orderHistory"),
where("email","==",email)
);

onSnapshot(historyQuery,snapshot=>{

historyContainer.innerHTML="";

snapshot.forEach(doc=>{

const order = doc.data();

let itemsHTML="";

order.items.forEach(item=>{
itemsHTML += `<li>${item.name} x ${item.qty}</li>`;
});

historyContainer.innerHTML += `

<div class="order-card history">

<h3>Table ${order.tableNumber}</h3>

<p><b>Completed</b></p>

<p><b>Total:</b> ₹${order.total}</p>

<ul>${itemsHTML}</ul>

</div>

`;

});

});

}