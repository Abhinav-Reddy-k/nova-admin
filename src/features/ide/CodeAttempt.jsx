import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

import CodeEditor from "./CodeEditor";
import { getCurrentTask } from "./codeTasksSlice";

const CodeAttempt = () => {
  const match = useRouteMatch();
  const currentTask = useSelector(getCurrentTask(match.params.title));
  const testCases = currentTask["testCases"];
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor testCases={testCases} />
    </>
  );
};

export default CodeAttempt;
