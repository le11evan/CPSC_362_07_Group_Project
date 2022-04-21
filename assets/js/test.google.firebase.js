// Google Firebase Implementation Testing
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
import { addReview, findReview } from "./Review.js";

console.log("Website Loaded Succesfully");

const firebaseConfig = {
  apiKey: "AIzaSyCw0xg3NVs6qoS6RYr64er6Em9MG-DTy7c",
  authDomain: "flushy-website.firebaseapp.com",
  projectId: "flushy-website",
  storageBucket: "flushy-website.appspot.com",
  messagingSenderId: "604068868575",
  appId: "1:604068868575:web:f9f66bce716a8a6970d46a",
  measurementId: "G-BQ3XH5KJBK",
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









/* ========== Google Firestore Implementation ========== */

/*
async function getImagesAlpha(db) {
const imageCol = collection(db, 'images-alpha');
const imageSnapshot = await getDocs(imageCol);
const imageList = imageSnapshot.docs.map(doc => doc.data());
return imageList;
}
*/

// --Loading Dynamic Images--
var dImg = document.createElement("img");
dImg.src = "images/pic07.jpg";
document.getElementById("defaultImage").appendChild(dImg);
// --End Loading--

//document.getElementById("submitButton").addEventListener("click", getForm);
document.getElementById("freshButton").addEventListener("click", refreshImages);

// Storage
//document.getElementById("storageTestButton").addEventListener("click", addImage);

const cloudImage = document.getElementById("cloudImage");
//cloudImage.addEventListener("change", updateImageSelector);

function bruh() {
  console.log("Bruh.");
}

// -Gets text in the "URL" form and passes it to Google Firestore-
function getForm() {
  var formText = document.getElementById("userURL").elements[3].value;
  //document.getElementById("submitTest").innerHTML = formText;

  addImageURL(formText);
}

// TODO: Separate firebase call into its own async function
async function refreshImages() {
  var formText = document.getElementById("alphaURL").elements[0].value;
  document.getElementById("defaultImage").removeChild(dImg);
  dImg.src = formText;
  document.getElementById("defaultImage").appendChild(dImg);

  /*
    // TODO: Replace with try/catch
    const querySnapshot = await getDoc(collection(db, "users", ));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.get("born")}`);
    });
    */
  //
}

// - Contacts Google Firestore and attempts to store "text" as a field in the 'images-alpha' database
/*async function addImageURL(text) {
  try {
    const docRef = await addDoc(collection(db, "images-alpha"), { link: text });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
*/


/* ========== End Firestore Implementation ========== */

/* ========== Google Storage Implementation ========== */

/*async function updateImageSelector() {
  const preview = document.getElementById("cloudImgPreview");

  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = cloudImage.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);
    const details = document.createElement("p");

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");

      para.textContent = `File name ${file.name}, file size ${file.size}.`;
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);

      listItem.appendChild(image);
      listItem.appendChild(para);

      list.appendChild(listItem);

      const storageRef = ref(storage, "images/" + file.name);
      const metadata = { contentType: "image/jpeg" };

      console.log(file.name);

      await uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log("Uploaded an image file!");
      });

      //TODO: Put following lines into its own function, add more detailed firestore data
      getDownloadURL(storageRef).then((url) => {
        addImageURL(url); //Firestore call
        document.getElementById("defaultImage").removeChild(dImg);
        dImg.src = url;
        document.getElementById("defaultImage").appendChild(dImg);
      });
    }

    details.textContent = "File Uploaded!";
    preview.appendChild(details);
  }
}
*/



/* ========== End Google Storage ========== */
