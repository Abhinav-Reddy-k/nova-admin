import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB7caZkaw4cS9wUIY8emP9oly1EuYD6Li4",
  authDomain: "nova-cc2ee.firebaseapp.com",
  projectId: "nova-cc2ee",
  storageBucket: "nova-cc2ee.appspot.com",
  messagingSenderId: "243374955927",
  appId: "1:243374955927:web:130d92bcd3ab72d6b4f8d2",
};

firebase.initializeApp(firebaseConfig);
firebase.functions().useEmulator("localhost", 5001);

export default firebase;
