console.log("Signup JS Loaded");

/* ================= FIREBASE ================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
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
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

/* ================= EMAIL SIGNUP ================= */

async function signup() {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const errorEl = document.getElementById("error");

  errorEl.textContent = "";

  if (!email || !password || !confirm) {
    errorEl.textContent = "Please fill all fields.";
    return;
  }

  if (password !== confirm) {
    errorEl.textContent = "Passwords do not match.";
    return;
  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // 🔥 Save user using UID (BEST PRACTICE)
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user",
      createdAt: new Date()
    });

    alert("Account created successfully!");
    window.location.href = "../structure/index.html";

  } catch (error) {

    let message = "";

    switch (error.code) {

      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;

      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;

      case "auth/weak-password":
        message = "Password must be at least 6 characters.";
        break;

      default:
        message = "Registration failed. Please try again.";
    }

    errorEl.textContent = message;
  }
}

/* SIGNUP BUTTON */
document.getElementById("signupBtn")
  ?.addEventListener("click", signup);

/* ENTER KEY */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") signup();
});

/* ================= GOOGLE SIGNUP ================= */

document.getElementById("googleLogin")
?.addEventListener("click", async () => {

  try {

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        role: "user",
        createdAt: new Date()
      });
    }

    window.location.href = "../structure/index.html";

  } catch (error) {
    console.log(error);
    alert("Google sign-in failed.");
  }

});

/* ================= PASSWORD TOGGLE ================= */

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

const toggleConfirm = document.getElementById("toggleConfirm");
const confirmInput = document.getElementById("confirm");


togglePassword?.addEventListener("click", () => {

  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  togglePassword.textContent =
    type === "password" ? "👁" : "⌣";

});


toggleConfirm?.addEventListener("click", () => {

  const type = confirmInput.type === "password" ? "text" : "password";
  confirmInput.type = type;

  toggleConfirm.textContent =
    type === "password" ? "👁" : "⌣";

});

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

closeBtn.addEventListener("click", () => {
    if (redirect) {
        window.location.href = redirect;
    } else {
        window.history.back();
    }
});