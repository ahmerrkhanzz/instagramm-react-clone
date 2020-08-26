import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDgMstg8NxCW4taneZyFNI5n1Q3ZWAMD98",
  authDomain: "instagramm-react-clone.firebaseapp.com",
  databaseURL: "https://instagramm-react-clone.firebaseio.com",
  projectId: "instagramm-react-clone",
  storageBucket: "instagramm-react-clone.appspot.com",
  messagingSenderId: "340084535555",
  appId: "1:340084535555:web:f3c836a649096a8edf7936",
  measurementId: "G-PLSY6JS7RE",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, storage, auth };
