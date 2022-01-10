import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FloatingActionButton from "../../app/common/FloatingActionButton";
import { myCodingTestListener } from "../../app/firebase/firestore/codingCollection";
import { selectProfileData } from "../Profile/profileSlice";
import { myCodingTaskesLoaded } from "./codeTasksSlice";
import CodeTestsGrid from "./CodeTestsGrid";

const CodingTasks = () => {
  const teacherProfile = useSelector(selectProfileData);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = myCodingTestListener(teacherProfile.uid).onSnapshot(
      (querySnapshot) => {
        let myCodingTests = [];
        querySnapshot.forEach((doc) => {
          let docData = doc.data();
          myCodingTests.push({
            ...docData,
            startTime: docData.startTime.toDate().toString(),
            id: doc.id,
          });
        });
        dispatch(myCodingTaskesLoaded(myCodingTests));
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <CodeTestsGrid />
      <Link to="/home/test/new">
        <FloatingActionButton tooltip="Start new coding test" />
      </Link>
    </div>
  );
};

export default CodingTasks;
