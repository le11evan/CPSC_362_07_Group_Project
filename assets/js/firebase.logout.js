import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initializing our database
const auth = getAuth();

const logout = document.querySelector("#signOut");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.reload();
  });
});
