import { Col, Row } from "antd";
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
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <TaskCard taskData={task} index={index} />
        </Col>
      ))}
    </Row>
  );
};

export default CodeTestsGrid;
