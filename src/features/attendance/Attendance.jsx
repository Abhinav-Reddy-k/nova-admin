import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";
import { selectClasses } from "../Profile/profileSlice";

const Attendance = () => {
  const classes = useSelector(selectClasses);
  return (
    <>
      {classes.map((cls) => (
        <Card hoverable style={{ width: 300 }}>
          <p>
            {cls.branch} {cls.section}
          </p>
          <p>{cls.year}</p>
          <p>{cls.subject}</p>
        </Card>
      ))}
    </>
  );
};

export default Attendance;
