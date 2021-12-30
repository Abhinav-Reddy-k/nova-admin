import db from "../firestoreService";
import firebase from "../firebaseConfig";

export const myCodingTestListener = (uid) => {
  return db.collection("coding tests").where("teacherId", "==", uid);
};

export const startCodingTest = async (title) => {
  try {
    let docref = await db
      .collection("coding tests")
      .where("title", "==", title)
      .limit(1)
      .get();
    docref.forEach((doc) => {
      doc.ref.update({ isStarted: true });
    });
    console.log("Coding test started");
  } catch (error) {
    throw error.message;
  }
};

export const stopCodingTest = async (title) => {
  try {
    let docref = await db
      .collection("coding tests")
      .where("title", "==", title)
      .limit(1)
      .get();
    docref.forEach((doc) => {
      doc.ref.update({ isStarted: false });
    });
    console.log("Coding test stopped");
  } catch (error) {
    throw error.message;
  }
};

export const addNewCodingTest = (
  { classData, testCases, description, title },
  { displayName, photoURL, uid }
) => {
  try {
    classData.forEach((cls) => {
      let collRef = db.collection("coding tests");

      collRef.add({
        teacherId: uid,
        year: cls.year,
        branch: cls.branch,
        subject: cls.subject,
        teacherPhoto: photoURL,
        startTime: firebase.firestore.Timestamp.fromDate(new Date()),
        section: cls.section,
        teacher: displayName,
        description,
        title,
        testCases,
      });
    });
  } catch (error) {
    throw error.message;
  }
};

export const deleteCodingTest = async (title) => {
  try {
    let docref = await db
      .collection("coding tests")
      .where("title", "==", title)
      .limit(1)
      .get();
    docref.forEach((doc) => {
      doc.ref.delete();
    });
    console.log("Coding test deleted");
  } catch (error) {
    throw error.message;
  }
};
