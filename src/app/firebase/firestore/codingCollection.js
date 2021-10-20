import db from "../firestoreService";

export const myCodingTestListener = (uid) => {
  return db.collection("coding tests").where("teacherId", "==", uid);
};
