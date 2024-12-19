import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/messaging';

export const firebaseConfig = {
  apiKey: "AIzaSyAe9yLTwL1MEWUKUrG7qlz_qb_523YXxfA",
  authDomain: "ppix-41bf8.firebaseapp.com",
  projectId: "ppix-41bf8",
  storageBucket: "ppix-41bf8.firebasestorage.app",
  messagingSenderId: "11117611081",
  appId: "1:11117611081:web:a5ac767d32c57f22619798",
  measurementId: "G-9X7WY37JML"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}

export const database = firebase.firestore();
export const storage = firebase.storage();
export const messaging = firebase.messaging
