// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  // signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { Config } from "./config.js"

const firebaseConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
  measurementId: Config.measurementId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initializing our database
const auth = getAuth(); // Initiaizing auth

// ================================ SIGNING IN (NEW ACCOUNT) ================================
signUp.addEventListener("click", (e) => {
  console.log("Button clicked");
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Saving user's data onto our real time database
      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
        password: password, // NOTE: NEVER SAVE YOUR PASSWORD TO THIS DATABASE, BUT WE ARE JUST DOING THIS FOR CONVENIENCE
      });

      alert("user created!");
      window.location.href = "../pages/login_existing_account.html";
    })
    .catch((error) => {
      // Failed to sign in
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});
