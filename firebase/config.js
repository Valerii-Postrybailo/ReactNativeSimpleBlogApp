import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs51qwJ6AGML5ZaBrD5q4therOfYQd3Ak",
  authDomain: "reactnativesimpleblogapp.firebaseapp.com",
  projectId: "reactnativesimpleblogapp",
  storageBucket: "reactnativesimpleblogapp.appspot.com",
  messagingSenderId: "501099425509",
  appId: "1:501099425509:web:6b89de8e05f57c35d06e0c",
  measurementId: "G-XN7CC0MGV4"
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

