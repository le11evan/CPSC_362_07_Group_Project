import {collection, query, where, getDocs, addDoc} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'
import {getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

//import { showmap } from './map.js'

//this file include two function add review and find review

//addreview need give following item add to firestore
//location: which is latitude and longitude => number
//Review text  =>string
//database from firestore=>Db



export async function addReview(lat, long, title, review, brate, myfile, db){
    const storage = getStorage();

    var locationID
        // Add a new location info.
        const docRef = await addDoc(collection(db, "location"), {
            latitude:  lat,
            longitude: long,
        });
        console.log("Document written with ID: ", docRef.id);
        locationID = docRef.id;

        // Add a new review with 
        const comment1 = await addDoc(collection(db, "review"), {
            ID: locationID,
            name: title,
            comment: review,
            rate: brate,
        });
        console.log("Document written with ID: ", comment1.id);
        var reviewid =comment1.id
   


        // add image
        const storageRef = ref(storage, "images/" + myfile.name);
        const metadata = { contentType: "image/jpeg" };
          
          
        await uploadBytes(storageRef, myfile, metadata).then((snapshot) => {
            console.log("Uploaded an image file!");
        });
          
        getDownloadURL(storageRef).then((url) => {
            addImageURL(url,reviewid, db); //add url to firebase
        });
        
}



// - Contacts Google Firestore and attempts to store "text" as a field in the 'images-alpha' database
async function addImageURL(text, review, db) {
    try {
    const docRef = await addDoc(collection(db, "images-alpha"), { 
        link: text,
        reviewid: review,
    });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}




// dis play everynear by review to the console
// need lat and long


export async function openReciew(lat, long, db){
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

  for(let i = 0; i < LocationID.length; i++) {
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



        console.log("name =" , name);
        console.log("rate =" , rate);
        console.log("comment =" , comment);

    });

    const p = query(collection(db, "images-alpha"), where("reviewid", "==", ReviewID));
    const PicturequerySnapshot = await getDocs(p);
    PicturequerySnapshot.forEach((doc) => {
        
        picturelink = doc.data().link;
        console.log("link =" , picturelink);
    });


    makeReview(picturelink, comment, name, rate);

  }





}




//read one location's review
//need the ID from that location;
export async function findReview(IDN, db){

    const q = query(collection(db, "review"), where("ID", "==", IDN));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // each review of same location would be here 
        console.log("review message is: ", doc.data().comment)
    });


}


export async function findlocation(locationID, db){
    var lat
    var long
    const q = query(collection(db, "location"), where("ID", "==", locationID));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        lat = doc.data().latitude,
        long = doc.data().longitude
    });


}


