import { Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import TaskCard from "./TaskCard";
import { selectCurrentCodingTasks } from "./codeTasksSlice";
import Nodata from "../../app/common/Nodata";

const CodeTestsGrid = () => {
  const myCodingTasks = useSelector(selectCurrentCodingTasks);
  return (
    <Row justify="center">
      {myCodingTasks.length === 0 && <Nodata />}
      {myCodingTasks.map((task, index) => (
        <TaskCard taskData={task} index={index} />
      ))}
    </Row>
  );
};

export default CodeTestsGrid;
