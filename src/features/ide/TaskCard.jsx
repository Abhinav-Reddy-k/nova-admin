import React from "react";
import { Button, Card, message } from "antd";
import { Link } from "react-router-dom";
import {
  startCodingTest,
  stopCodingTest,
} from "../../app/firebase/firestore/codingCollection";

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
        <Button
          disabled={!isStarted}
          onClick={() =>
            stopCodingTest(title)
              .then(message.warn("Code task Stopped"))
              .catch((err) => message.error(err))
          }
        >
          Stop
        </Button>,
        <Button
          disabled={isStarted}
          onClick={() =>
            startCodingTest(title)
              .then(message.success("Code task Stopped"))
              .catch((err) => message.error(err))
          }
        >
          {isStarted ? "Started" : "start"}
        </Button>,
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
