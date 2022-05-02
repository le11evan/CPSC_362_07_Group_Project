import {collection, query, where, getDocs, addDoc, getFirestore} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

// Google Firebase Implementation Testing
// Review Implementation testing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
//import { showmap } from './map.js'
import { Config } from "./config.js"
import { currentlocation } from './currentlocation.js';

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

var location = currentlocation();
var lat = location[0];
var long = location[1];
    var LocationID =[];
  
    const q = query(collection(db, "location"), where("latitude", ">=", lat-0.02),where("latitude", "<=", lat+0.02));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
  
        let lat1 = doc.data().latitude;
        let long1 = doc.data().longitude;
        if(long1 >= (long-0.02) && long1 <= (long+0.02)){
          LocationID.push(doc.id);
    }
    
    });
    

    //only pull 5 comment
    for(let i = 0; i < 9; i++) {
      let ReviewID;
      let picturelink;
      let comment;
      let rate;
      let name;
      let picture;
  
      const r = query(collection(db, "review"), where("ID", "==", LocationID[i]));
      const reviewquerySnapshot = await getDocs(r);
      
      reviewquerySnapshot.forEach((doc) => {
          
          comment = doc.data().comment;
          rate = doc.data().rate;
          name = doc.data().name;
          picture = doc.id;
          ReviewID= picture
  
          //console.log("name =" , name);
          // console.log("rate =" , rate);
          // console.log("comment =" , comment);
  
      });
  
      const p = query(collection(db, "images-alpha"), where("reviewid", "==", ReviewID));
      const PicturequerySnapshot = await getDocs(p);
      PicturequerySnapshot.forEach((doc) => {
          
          picturelink = doc.data().link;
          console.log("link =" , picturelink);
      });
  
  
      //add new Review box
  
    //<div class="col-4 col-12-mobile">
    const newDiv = document.createElement("div");
    newDiv.className="col-4 col-12-mobile";
  
    //<div class="card">
    const card = document.createElement("div");
    card.className ="card";
  
    //<article class="item">
    const article = document.createElement("article");
    article.className="item";
  
      //no picture;
      if(picturelink == null){
        picturelink = "images/pic07.jpg"
      }
  
    //'<a href="images/pic07.jpg" class="image fit"><img src="images/pic07.jpg" alt="" /></a>'
    const createA = document.createElement("a");
    createA.setAttribute('href', picturelink);
    createA.className = "image fit";
  
    const createSrc = document.createElement('img');
    createSrc.src =  picturelink;
    createSrc.setAttribute('alt', "");
  
  
    createA.appendChild(createSrc);
    
    //<a href="images/Dummy Data/Bobbys-Lux.jpg" class="image fit"><img src="images/Dummy Data/Bobbys-Lux.jpg" alt="" />
    //<p class="revText"> This is for the full review text. </p>
    //</a>
  
  
  
    const revText = document.createElement('p');
    revText.className="revText";
    revText.innerHTML = comment;
    createA.appendChild(revText);
  
  
    const header = document.createElement("header");
    const h3 = document.createElement("h3");
    h3.innerHTML = name;
  
    const h32 = document.createElement("h3");
    h32.className ="rating__icon rating__icon--star fa fa-star";
    var ratestring = rate + " stars"
    h32.innerHTML = ratestring;
    
  
    header.appendChild(h3);
    header.appendChild(h32);
  
    article.appendChild(createA);
    article.appendChild(header);
    card.appendChild(article);
    newDiv.appendChild(card);
  
    document.getElementById("rowpic").appendChild(newDiv);
  
    $(function () {
		var foo = $('#gallery');
		foo.poptrox({
			usePopupNav: true,
			usePopupCaption: true,
			caption: { selector: ".revText", remove: true }
		});

	  });   
  
    }
  
    
 	// Poptrox

  
  
  
