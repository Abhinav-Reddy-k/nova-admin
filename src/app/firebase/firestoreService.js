import firebase from "./firebaseConfig";

const db = firebase.firestore();
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}

export default db;
