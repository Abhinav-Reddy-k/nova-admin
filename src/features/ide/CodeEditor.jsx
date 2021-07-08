import { Card, Col, Input, Row, Tabs } from "antd";
import { Button } from "antd/lib/radio";
import axios from "axios";
import React, { useState } from "react";
import AceEditor from "react-ace-builds";
import { FaPython } from "react-icons/fa";
import { SiCplusplus, SiJava, SiJavascript } from "react-icons/si";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
const CodeEditor = () => {
  const { TabPane } = Tabs;
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");

  const [outputData, setOutput] = useState({
    output: "",
    statusCode: "",
    memory: "",
    cpuTime: "",
  });
  function onChange(newValue) {
    setCode(newValue);
  }

  const getOutput = async () => {
    console.log(code, stdin);
    const { data } = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "504d3f8e7aa550a36678ac75c6daf92b",
      clientSecret:
        "9b3c4230355b9576fe602ff7a5286f9e0b542348a01771ff3d5318d6ac53cd16",
      script: code,
      language: "python3",
      versionIndex: "3",
      stdin,
    });
    setOutput(data);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane
          tab={
            <span style={{ width: "30px", margin: "10px" }}>
              <FaPython style={{ marginRight: "10px" }} />
              python
            </span>
          }
          key="1"
        ></TabPane>
        <TabPane
          tab={
            <span style={{ width: "30px", margin: "10px" }}>
              <SiCplusplus style={{ marginRight: "10px" }} />
              c++
            </span>
          }
          key="2"
        ></TabPane>
        <TabPane
          tab={
            <span style={{ width: "30px", margin: "10px" }}>
              <SiJava style={{ marginRight: "10px" }} />
              java
            </span>
          }
          key="3"
        ></TabPane>
        <TabPane
          tab={
            <span style={{ width: "30px", margin: "10px" }}>
              <SiJavascript style={{ marginRight: "10px" }} />
              javascript
            </span>
          }
          key="4"
        ></TabPane>
      </Tabs>
      <Row style={{ marginTop: 30 }} justify="space-around">
        <Col span={10} style={{ zIndex: 0 }}>
          <AceEditor
            placeholder="Write code here"
            mode="python"
            value={code}
            theme="monokai"
            name="blah2"
            onChange={onChange}
            fontSize={20}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <Button onClick={getOutput}>Exectute</Button>
          <Input.TextArea
            value={stdin}
            rows={4}
            placeholder="STDIN"
            onChange={(e) => setStdin(e.target.value)}
          ></Input.TextArea>
        </Col>
        <Col span={10}>
          <Card
            title="Output"
            style={{ height: "500px" }}
            actions={[
              <p>Status Code : {outputData.statusCode}</p>,
              <p>Memory: {outputData.memory}</p>,
              <p>Cpu Time: {outputData.cpuTime}</p>,
            ]}
          >
            <pre style={{ height: "310px" }}>{outputData.output}</pre>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CodeEditor;
