import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCw0xg3NVs6qoS6RYr64er6Em9MG-DTy7c",
  authDomain: "flushy-website.firebaseapp.com",
  databaseURL: "https://flushy-website-default-rtdb.firebaseio.com",
  projectId: "flushy-website",
  storageBucket: "flushy-website.appspot.com",
  messagingSenderId: "604068868575",
  appId: "1:604068868575:web:f9f66bce716a8a6970d46a",
  measurementId: "G-BQ3XH5KJBK",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initializing our database
const auth = getAuth();

// "Write a review" button, but it does not lead to anywhere... It is only
// an alias to remind the user to create acc/login in order to write reviews
const aliasButton = document.getElementById("write-review-alias-btn");
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const email = user.email;
    const username = user.username;

    // console.log("User is signed in! User is: " + email + " " + uid);

    document.getElementById("signOut").style.display = "block";
    document.getElementById("create-account").style.display = "none";
    document.getElementById("signIn").style.display = "none";
    document.getElementById("login-display").style.display = "block";
    document.getElementById("username-span").textContent = email;

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    document.getElementById("contact").style.display = "inline";
    document.getElementById("write-review-nav-btn").style.display = "inline";

    aliasButton.style.display = "none";
    document.getElementById("write-review-scroll-btn").style.display = "inline";
  } else {
    // User is signed out
    console.log("User is signed out!");
    document.getElementById("signOut").style.display = "none";
    document.getElementById("create-account").style.display = "inline";
    document.getElementById("signIn").style.display = "inline";
    document.getElementById("login-display").style.display = "none";

    document.getElementById("contact").style.display = "none";
    document.getElementById("write-review-nav-btn").style.display = "none";

    document.getElementById("write-review-alias-btn").style.display = "inline";
    document.getElementById("write-review-scroll-btn").style.display = "none";
  }
});
