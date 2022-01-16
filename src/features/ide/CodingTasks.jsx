import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FloatingActionButton from "../../app/common/FloatingActionButton";
import { myCodingTestListener } from "../../app/firebase/firestore/codingCollection";
import { selectProfileData } from "../Profile/profileSlice";
import { myCodingTaskesLoaded } from "./codeTasksSlice";
import CodeTestsGrid from "./CodeTestsGrid";

const CodingTasks = ({ teacherProfile, myCodingTaskesLoaded }) => {
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
        myCodingTaskesLoaded(myCodingTests);
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

const mapStateToProps = (state) => {
  return {
    teacherProfile: selectProfileData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myCodingTaskesLoaded: (codingTasks) =>
      dispatch(myCodingTaskesLoaded(codingTasks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodingTasks);
