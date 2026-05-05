import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ================= FIREBASE ================= */

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

let isAdmin = false;

const auth = getAuth(app);

onAuthStateChanged(auth, (user)=>{
  if(user && user.email === "svkarthigeyan@gmail.com"){
    isAdmin = true;
  }
});

/* ================= MENU DATA ================= */

const menuData = {

coffee:[

{
name:"Espresso",
img:"../image/espresso.jpg",
desc:"Rich and bold shot of pure coffee energy.",
sizes:{
  Small:100,
  Medium:120,
  Large:140
}
},

{
name:"Latte",
img:"../image/latte.jpg",
desc:"Smooth espresso with creamy milk foam.",
sizes:{
  Small:130,
  Medium:150,
  Large:180
},
options:{
  sugar:["No Sugar","Less Sugar","Normal","Extra Sweet"],
  strength:["Light","Medium","Strong"]
}
},

{
name:"Cappuccino",
img:"../image/Cappuccino.jpg",
desc:"Perfect balance of espresso and foam.",
sizes:{
  Small:130,
  Medium:150,
  Large:180
},
options:{
  sugar:["No Sugar","Less Sugar","Normal"],
  strength:["Light","Medium","Strong"]
}
},

{
name:"Americano",
img:"../image/Americano.jpg",
desc:"Espresso diluted with hot water.",
sizes:{
  Small:110,
  Medium:130,
  Large:150
},
options:{
  strength:["Light","Medium","Strong"]
}
},

{
name:"Mocha",
img:"../image/Mocha.png",
desc:"Chocolate flavored espresso drink.",
sizes:{
  Small:150,
  Medium:170,
  Large:200
},
options:{
  sugar:["Less Sugar","Normal","Extra Sweet"]
}
}

],

tea: [

{
  name:"Green Tea",
  img:"../image/Green Tea.jpg",
  desc:"Light and refreshing antioxidant-rich tea.",
  price:30,
  options:{
    sugar:["No Sugar","Less Sugar","Normal"]
  }
},

{
  name:"Ginger Tea",
  img:"../image/Ginger Tea.jpg",
  desc:"Warm spiced tea with fresh ginger kick.",
  price:25,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
},

{
  name:"Masala Tea",
  img:"../image/Masala Tea.webp",
  desc:"Classic Indian chai with aromatic spices.",
  price:30,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
},

{
  name:"Herbal Tea",
  img:"../image/Herbal Tea.jpg",
  desc:"Caffeine-free soothing herbal infusion.",
  price:30,
  options:{
    sugar:["No Sugar","Less Sugar","Normal"]
  }
},

{
  name:"Iced Tea",
  img:"../image/Iced Tea.jpg",
  desc:"Chilled tea with a refreshing citrus twist.",
  price:35,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
}

],

pastries: [

{
  name:"Chocolate Cake",
  img:"../image/cakes.jpg",
  desc:"Rich and moist chocolate layered cake.",
  price:45
},

{
  name:"Croissant",
  img:"../image/croissant.jpg",
  desc:"Flaky buttery French pastry.",
  price:50
},

{
  name:"Danish Pastry",
  img:"../image/Danish Pastries.jpg",
  desc:"Crispy pastry filled with sweet cream or fruit.",
  price:65
},

{
  name:"Muffins",
  img:"../image/Muffins.jpg",
  desc:"Soft baked muffins with chocolate chips.",
  price:45
},

{
  name:"Red Velvet Cake",
  img:"../image/Red Velvet Cake.webp",
  desc:"Smooth cream layered red velvet delight.",
  price:60
},

{
  name:"Cheesecake",
  img:"../image/Cheesecake.webp",
  desc:"Creamy baked cheesecake with biscuit base.",
  price:70
}

],

cookies: [

{
  name:"Chocolate Chip Cookies",
  img:"../image/cookies.jpg",
  desc:"Crunchy cookies loaded with chocolate chips.",
  price:55
},

{
  name:"Oatmeal Cookies",
  img:"../image/Oatmeal Cookies.jpg",
  desc:"Healthy oats cookies with a soft bite.",
  price:50
}

],

special: [

{
  name:"Pumpkin spice latte",
  img:"../image/Pumpkin spice latte.jpeg",
  desc:"A cozy, aromatic blend of espresso, steamed milk, and warming spices",
  price:55
},
 
{
  name:"Red Velvet Tart",
  img:"../image/seasonal special.png",
  desc:"The image displays several small red velvet tarts topped with white frosting and red crumbs. ",
  price:120,
}

],

cold: [

{
  name:"Strawberry Shake",
  img:"../image/smoothie.jpg",
  desc:"Creamy strawberry milkshake.",
  price:120,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
},

{
  name:"Cold Coffee",
  img:"../image/Cold Coffee.jpg",
  desc:"Chilled coffee blended with milk and ice.",
  price:100,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
},

{
  name:" Smoothie",
  img:"../image/Smoothies.jpg",
  desc:"Thick tropical mango smoothie.",
  price:110,
  options:{
    Choices:["Mango","Strawberry","Blcueberry"]
  }
},

{
  name:"Matcha Latte",
  img:"../image/Matcha.jpg",
  desc:"Creamy matcha drink with earthy flavor.",
  price:90,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
},

{
  name:"Chocolate Milkshake",
  img:"../image/Chocolate Milkshake.jpg",
  desc:"Rich chocolate shake topped with cream.",
  price:130,
  options:{
    sugar:["Less Sugar","Normal","Extra Sweet"]
  }
}

],

};

window.menuData = menuData;


/* ================= LOAD MENU ================= */

function openMenu(category){

  const container = document.getElementById("menuItems");
  container.innerHTML = "";

  // ✅ LOAD STATIC FIRST
  let allItems = menuData[category] ? [...menuData[category]] : []; 

  // ✅ FIRESTORE LOAD (SAFE)
  getDocs(collection(db, "menu"))
    .then(snapshot => {

      snapshot.forEach(docSnap => {
        const data = docSnap.data();

        if (data.category === category) {
          allItems.push({
            ...data,
            id: docSnap.id,
            isAdmin: true
          });
        }
      });

      renderItems(allItems, container);

    })
    .catch(() => {
      // fallback
      renderItems(allItems, container);
    });
}


  /* ================= RENDER ================= */

function renderItems(items, container){

  container.innerHTML = "";

 items.forEach((item, index) => {

    container.innerHTML += `
      <div class="menu-card">

        <img src="${item.img || '../image/default.jpg'}"
          onclick='openPopup(${JSON.stringify(item)})'>

        <div class="menu-content">

          <h3 onclick='openPopup(${JSON.stringify(item)})'>
            ${item.name}
          </h3>

          <p onclick='openPopup(${JSON.stringify(item)})'>
            ${item.desc}
          </p>

          <p class="price">
            ${item.sizes 
              ? "₹" + (item.sizes.Medium || Object.values(item.sizes)[0])
              : (item.price ? "₹" + item.price : "")
            }
          </p>

          <div class="btn-group">

            <button class="view-btn"
              onclick='openPopup(${JSON.stringify(item)})'>
              View
            </button>

            <button class="add-cart-btn"
            data-item='${encodeURIComponent(JSON.stringify(item))}'>
            Add
            </button>

          </div>

        </div>
      </div>
    `;
  });

  updateCartCount();
}




// ================= POPUP =================

let selectedItem = null;
let popupQty = 1;
let selectedSize = null;
let selectedPrice = 0;

window.openPopup = function(item){

  selectedItem = item;
  popupQty = 1;

  document.getElementById("productPopup").classList.add("active");
  document.getElementById("popupImg").src = item.img || "../image/default.jpg";
  document.getElementById("popupName").innerText = item.name;
  document.getElementById("popupQty").innerText = popupQty;

  const sizeBox = document.querySelector(".size-options");

  // ================= SIZE =================
if(item.sizes){

  sizeLabel.style.display = "block";   // ✅ ADD THIS
  sizeBox.style.display = "flex";
  sizeBox.innerHTML = "";

  Object.keys(item.sizes).forEach((size)=>{
    sizeBox.innerHTML += `
      <button onclick="selectSize('${size}', ${item.sizes[size]}, event)">
        ${size}
      </button>
    `;
  });

  const sizes = Object.keys(item.sizes);
  const defaultSize = sizes.includes("Medium") ? "Medium" : sizes[0];

  selectedSize = defaultSize;
  selectedPrice = item.sizes[defaultSize];

  setTimeout(()=>{
    document.querySelectorAll(".size-options button").forEach(btn=>{
      if(btn.innerText === defaultSize){
        btn.classList.add("active");
      }
    });
  }, 0);

} else {

  sizeLabel.style.display = "none";  
  sizeBox.style.display = "none";

  selectedSize = null;
  selectedPrice = item.price || "";
}

  // update price
  document.getElementById("popupPrice").innerText =
    selectedPrice ? "₹" + selectedPrice : "";

// ================= OPTIONS =================

const sugarBox = document.getElementById("sugarOptions");
const strengthBox = document.getElementById("strengthOptions");

const sugarLabel = document.getElementById("sugarLabel");
const strengthLabel = document.getElementById("strengthLabel");

sugarBox.innerHTML = "";
strengthBox.innerHTML = "";

// SHOW ONLY IF OPTIONS EXIST
if (item.options) {

  // SUGAR
  if (item.options.sugar) {
    sugarLabel.style.display = "block";
    sugarBox.style.display = "flex";

    item.options.sugar.forEach(opt => {
      sugarBox.innerHTML += `<button>${opt}</button>`;
    });

  } else {
    sugarLabel.style.display = "none";
    sugarBox.style.display = "none";
  }

  // STRENGTH
  if (item.options.strength) {
    strengthLabel.style.display = "block";
    strengthBox.style.display = "flex";

    item.options.strength.forEach(opt => {
      strengthBox.innerHTML += `<button>${opt}</button>`;
    });

  } else {
    strengthLabel.style.display = "none";
    strengthBox.style.display = "none";
  }

} else {
  sugarLabel.style.display = "none";
  sugarBox.style.display = "none";
  strengthLabel.style.display = "none";
  strengthBox.style.display = "none";
}

  loadSuggestions(item);
};


// ================= CLOSE =================

window.closePopup = function(){
  document.getElementById("productPopup").classList.remove("active");
};

// Close when clicking outside the modal box (on the overlay)
document.addEventListener("click", function(e){
  const popup = document.getElementById("productPopup");
  if(popup && e.target === popup){
    window.closePopup();
  }
});

// Close on Escape key
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    const popup = document.getElementById("productPopup");
    if(popup && popup.classList.contains("active")){
      window.closePopup();
    }
  }
});


// ================= SIZE FUNCTION =================

window.selectSize = function(size, price, e){

  selectedSize = size;
  selectedPrice = price;

  document.querySelectorAll(".size-options button").forEach(btn=>{
    btn.classList.remove("active");
  });

  if(e) e.target.classList.add("active");

  document.getElementById("popupPrice").innerText = "₹" + price;
};


// ================= QTY =================

window.increaseQtyPopup = function(){
  popupQty++;
  document.getElementById("popupQty").innerText = popupQty;
};

window.decreaseQtyPopup = function(){
  if(popupQty > 1){
    popupQty--;
    document.getElementById("popupQty").innerText = popupQty;
  }
};


// ================= ADD =================

function getSelected(id){
  return document.querySelector(`#${id} .active`)?.innerText || null;
}

window.addFromPopup = function(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let sugar = getSelected("sugarOptions");
  let strength = getSelected("strengthOptions");

  let item = cart.find(i =>
    i.name === selectedItem.name &&
    i.size === selectedSize &&
    i.sugar === sugar &&
    i.strength === strength
  );

  if(item){
    item.qty += popupQty;
  } else {
    cart.push({
      name: selectedItem.name,
      img: selectedItem.img,
      price: selectedPrice,
      size: selectedSize,
      qty: popupQty,
      sugar: sugar,
      strength: strength
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  showAnimation();
  closePopup();
};


// ================= QUICK ADD =================

function quickAddToCart(item){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let price = item.sizes
    ? item.sizes.Medium || Object.values(item.sizes)[0]
    : item.price || 0;

  let size = item.sizes ? "Medium" : null;

  let existing = cart.find(i =>
    i.name === item.name && i.size === size
  );

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({
      name: item.name,
      img: item.img,
      price: price,
      size: size,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  showAnimation();
}


// ================= COUNT =================

function updateCartCount(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.qty, 0);

  const countEl = document.getElementById("cart-count");

  if(countEl){
    countEl.innerText = total;
    countEl.style.display = total > 0 ? "inline-block" : "none";
  }
}


/* ================= DELETE ================= */

window.deleteItem = async (id) => {
  if(confirm("Delete this item?")){
    await deleteDoc(doc(db, "menu", id));
    location.reload(); // refresh after delete
  }
};

/* ================= SUGGEST ================= */

function loadSuggestions(currentItem){

  const box = document.getElementById("suggestionsBox");
  box.innerHTML = "";

  let allItems = [];

  Object.values(menuData).forEach(arr => {
    allItems = allItems.concat(arr);
  });

  let filtered = allItems.filter(i => i.name !== currentItem.name);

  for (let i = filtered.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
}

  const suggestions = filtered.slice(0, 2);

  suggestions.forEach(item => {
    box.innerHTML += `
  <div class="suggest-card" data-name="${item.name}">
    <img src="${item.img}" class="suggest-open">
    <p class="suggest-open">${item.name}</p>
    <button class="suggest-btn">+</button>
  </div>
`;
  });
}


/* ================= OPTION CLICK ================= */

document.addEventListener("click", function(e){

  // ✅ OPTION SELECT
  if(e.target.closest(".options")){
    const group = e.target.parentElement;
    group.querySelectorAll("button")
      .forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
  }

  // ✅ ADD TO CART
  const btn = e.target.closest(".add-cart-btn");

  if(btn){
    const itemData = btn.getAttribute("data-item");

    if(itemData){
      const item = JSON.parse(decodeURIComponent(itemData));
      quickAddToCart(item);
    }
  }

});


/* ================= ANIMATION ================= */

function showAnimation(){

  const div=document.createElement("div");
  div.className="added-animation";
  div.innerText="Added to Cart";

  document.body.appendChild(div);

  setTimeout(()=>div.remove(),2000);
}

document.addEventListener("click", function(e){

  // ===== ADD TO CART (+ button)
  const addBtn = e.target.closest(".suggest-btn");
  if(addBtn){
    const card = addBtn.closest(".suggest-card");
    const name = card.getAttribute("data-name");

    let foundItem = null;

    Object.values(menuData).forEach(arr=>{
      arr.forEach(item=>{
        if(item.name === name){
          foundItem = item;
        }
      });
    });

    if(foundItem){
      quickAddToCart(foundItem);
    }

    return; 
  }

  const open = e.target.closest(".suggest-open");
  if(open){
    const card = open.closest(".suggest-card");
    const name = card.getAttribute("data-name");

    let foundItem = null;

    Object.values(menuData).forEach(arr=>{
      arr.forEach(item=>{
        if(item.name === name){
          foundItem = item;
        }
      });
    });

    if(foundItem){
      openPopup(foundItem);
    }
  }

});

const page = window.location.pathname;

if (page.includes("coffee")) openMenu("coffee");
else if (page.includes("tea")) openMenu("tea");
else if (page.includes("pastries")) openMenu("pastries");
else if (page.includes("cookies")) openMenu("cookies");
else if (page.includes("cold")) openMenu("cold");
else if (page.includes("special")) openMenu("special");

/* INIT */
updateCartCount();