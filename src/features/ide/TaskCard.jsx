import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";

const TaskCard = ({ taskData, index }) => {
  const { title, teacherPhoto, isStarted, description } = taskData;
  return (
    <Card
      hoverable
      key={index}
      style={{
        width: 240,
        margin: "8px",
      }}
      cover={
        <img
          alt="example"
          style={{ objectFit: "cover" }}
          height="250px"
          width="200px"
          src={teacherPhoto}
        />
      }
      actions={[
        <Button disabled={!isStarted} onClick={() => {}}>
          Stop
        </Button>,
        <Button disabled={isStarted}>{isStarted ? "Started" : "start"}</Button>,
        <Button>
          <Link to={`/home/test/attempt/${title}`}>Attempt</Link>
        </Button>,
      ]}
    >
      <Card.Meta title={title} description="description" />
      <pre> --seb</pre>
    </Card>
  );
};

export default TaskCard;
