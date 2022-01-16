import { Card } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import CodeEditor from "./CodeEditor";
import { getCurrentTask } from "./codeTasksSlice";

const CodeAttempt = ({ getCurrentTask }) => {
  const params = useParams();
  const currentTask = getCurrentTask(params.title);
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

const mapStateToProps = (state) => {
  return {
    getCurrentTask: (id) => getCurrentTask(id)(state),
  };
};

export default connect(mapStateToProps)(CodeAttempt);
