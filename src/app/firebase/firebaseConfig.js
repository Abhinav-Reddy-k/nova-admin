import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

firebase.initializeApp(firebaseConfig);

const useEmulator = true;

if (window.location.hostname === "localhost" && useEmulator) {
  firebase.functions().useEmulator("localhost", 5001);
  firebase
    .auth()
    .useEmulator("http://localhost:9099", { disableWarnings: true });
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.storage().useEmulator("localhost", 9199);
}

export default firebase;
