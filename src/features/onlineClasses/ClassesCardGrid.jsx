import { Card, Col, message, Row } from "antd";
import { Button } from "antd/lib/radio";
import React from "react";
import { useSelector } from "react-redux";
import Nodata from "../../app/common/Nodata";
import { stopOnlineClass } from "../../app/firebase/firestore/classesCollection";
import { selectCurrentClasses } from "./classesSclice";

const ClassCardGrid = () => {
  const { Meta } = Card;
  const currentClasses = useSelector(selectCurrentClasses);
  return (
    <>
      <Row justify="center">
        {currentClasses.length === 0 && <Nodata />}
        {currentClasses.map((cls, index) => {
          return (
            <Col>
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
                    src={cls.teacherPhoto}
                  />
                }
                actions={[
                  <Button
                    onClick={() =>
                      stopOnlineClass(cls.id)
                        .then(message.warn("Class Stopped"))
                        .catch((err) => message.error(err.message))
                    }
                  >
                    Stop
                  </Button>,
                  <Button>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={cls.classUrl}
                    >
                      Join
                    </a>
                  </Button>,
                ]}
              >
                <Meta
                  title={`${cls.description}`}
                  description={`${cls.subject} (${cls.section})`}
                />
                <pre>
                  <br />
                  {`  -- ${cls.teacher}`}
                </pre>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ClassCardGrid;
