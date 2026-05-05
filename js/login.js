import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig={
apiKey:"AIzaSyBXSnukZm-1AvQZ7z9JsmJDUrlWtP1Y4aY",
authDomain:"brew-and-chapters.firebaseapp.com",
projectId:"brew-and-chapters",
storageBucket:"brew-and-chapters.firebasestorage.app",
messagingSenderId:"542206853478",
appId:"1:542206853478:web:024ac297bb6e85dd7908a7"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const provider=new GoogleAuthProvider();


/* ================= LOGIN ================= */

async function login(){

const email=document.getElementById("username").value.trim();
const password=document.getElementById("password").value;
const errorEl=document.getElementById("error");

errorEl.textContent="";

try{

const userCredential =
await signInWithEmailAndPassword(auth,email,password);

const user=userCredential.user;


/* ===== SAVE USER IF NOT EXISTS ===== */

const userRef=doc(db,"users",user.uid);
const userSnap=await getDoc(userRef);

if(!userSnap.exists()){

await setDoc(userRef,{
email:user.email,
role:"user",
createdAt:new Date()
});

}


/* ===== CHECK ADMIN ===== */

const adminRef=doc(db,"admins",user.email);
const adminSnap=await getDoc(adminRef);

if(adminSnap.exists()){

window.location.href="admin.html";

}else{

window.location.href="index.html";

}

}catch(error){

let message="Login failed";

if(error.code==="auth/user-not-found")
message="No account found";

if(error.code==="auth/wrong-password")
message="Incorrect password";

errorEl.textContent=message;

}

}


/* LOGIN BUTTON */

document.getElementById("signupBtn")
?.addEventListener("click",login);


/* ENTER KEY LOGIN */

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter") login();

});


/* ================= GOOGLE LOGIN ================= */

document.getElementById("googleLogin")
?.addEventListener("click",async()=>{

try{

const result=await signInWithPopup(auth,provider);
const user=result.user;

const userRef=doc(db,"users",user.uid);
const userSnap=await getDoc(userRef);

if(!userSnap.exists()){

await setDoc(userRef,{
email:user.email,
role:"user",
createdAt:new Date()
});

}


const adminRef=doc(db,"admins",user.email);
const adminSnap=await getDoc(adminRef);

if(adminSnap.exists()){

window.location.href="admin.html";

}else{

window.location.href="index.html";

}

}catch(error){

alert("Google login failed");

}

});


/* ================= PASSWORD TOGGLE ================= */

const togglePassword=document.getElementById("togglePassword");
const passwordInput=document.getElementById("password");

if(togglePassword){

togglePassword.addEventListener("click",()=>{

const type=passwordInput.type==="password"?"text":"password";

passwordInput.type=type;

togglePassword.textContent=
type==="password"?"👁":"⌣";

});

}

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

closeBtn.addEventListener("click", () => {
    if (redirect) {
        window.location.href = redirect;
    } else {
        window.history.back();
    }
});