// Google Firebase Implementation Testing
// Review Implementation testing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  doc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
//import { showmap } from './map.js'
import { currentlocation } from "./currentlocation.js";
import { addReview, findReview, openReciew } from "./Review.js";
import { Config } from "./config.js"
//import {makeReview} from "./review.card.js"

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
const analysisData = getAnalytics(app);
const db = getFirestore(app);

const storage = getStorage();
const output = document.querySelector("fileOutput");


/*================================================================================================ */
/* ===========================    add review   ====================================================*/


/* ====================    fire base add text info ============================================*/
var comment;
var title;

document.getElementById("Review message").addEventListener('change', reviewtextChanged);
function reviewtextChanged(){
    comment = document.getElementById("Review message").value;

    //console.log(comment);
}


document.getElementById("reviewtitle").addEventListener('change', titletextChanged);
function titletextChanged(){
    title = document.getElementById("reviewtitle").value;

    //console.log(title);
}
/* ====================    fire base add text info ============================================*/



/*=====================    add image to fire base ==============================================*/
const userImage = document.getElementById("cloudImage");
userImage.addEventListener("change", updateImage);

var myfile;

function updateImage() {
    const curFiles = userImage.files;
    for (const file of curFiles) {

      myfile = file;
      console.log(myfile.name);
    }
  
}


//============   main review finction =============================================//

document.getElementById("submitButton").addEventListener("click", reviewfunction);
const nowlocation = currentlocation(); 

function reviewfunction(){

  // getElement from html need title, rate, review
  var rate = 0;
  var raten = document.getElementsByClassName("rating__input");

  for(let i = 0; i < raten.length; i++) {
      if(raten[i].checked){
          rate = raten[i].value;
      }
  }

  var lat  = nowlocation[0];
  var long = nowlocation[1];

  if(comment == null || title == null || rate == 0){
    const modal = document.getElementById("modalF");
    openModal(modal);
  }else{
    addReview(lat, long, title, comment, parseInt(rate), myfile,db);
    //console.log("this is" , reviewid);
    //Open notice
    const modal = document.getElementById("modalS");
    openModal(modal);

    console.log("review added");
    document.getElementById("userURL").reset();

  }
  //current location
}


const closeModalButtons = document.querySelectorAll('[data-close-button]')

const overlay = document.getElementById('overlay')
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}


/* ================================ end review ============================================   */
/* ========================================================================================   */



