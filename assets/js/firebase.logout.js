import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

const logout = document.querySelector("#signOut");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("Signed out button clicked!");
  });
});
