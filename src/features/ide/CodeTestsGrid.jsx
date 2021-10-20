import React from "react";
import { Row } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentCodingTasks } from "./codeTasksSlice";
import TaskCard from "./TaskCard";

const CodeTestsGrid = () => {
  const myCodingTasks = useSelector(selectCurrentCodingTasks);
  return (
    <Row justify="center">
      {myCodingTasks.map((task, index) => (
        <TaskCard taskData={task} index={index} />
      ))}
    </Row>
  );
};

export default CodeTestsGrid;
