import React from "react";
import CodeEditor from "./CodeEditor";
import { Card } from "antd";
import { useRouteMatch } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentTask } from "./codeTasksSlice";

const CodeAttempt = () => {
  const match = useRouteMatch();
  const currentTask = useSelector(getCurrentTask(match.params.title));
  const tests = Object.entries(currentTask["test cases"]);
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor tests={tests} />
    </>
  );
};

export default CodeAttempt;
