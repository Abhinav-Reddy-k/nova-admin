import { Card, Col, Input, Row, Menu } from "antd";
import { Button } from "antd/lib/radio";
import axios from "axios";
import React, { useState } from "react";
import AceEditor from "react-ace-builds";
import { FaPython } from "react-icons/fa";
import { DiSqllite } from "react-icons/di";

import {
  SiCplusplus,
  SiCsharp,
  SiJava,
  SiJavascript,
  SiNodeDotJs,
  SiDart,
  SiSwift,
  SiKotlin,
} from "react-icons/si";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [languageMode, setLangMode] = useState("python");
  const [language, setLang] = useState("python");
  const [versionIndex, setVerIndex] = useState(3);

  const [outputData, setOutput] = useState({
    output: "",
    statusCode: "",
    memory: "",
    cpuTime: "",
  });
  function onChange(newValue) {
    setCode(newValue);
  }

  const setIdeSettings = (mode, language, versionIndex) => {
    setLang(language);
    setVerIndex(versionIndex);
    setLangMode(mode);
  };

  const getOutput = async () => {
    console.log(code, stdin);
    const { data } = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: "504d3f8e7aa550a36678ac75c6daf92b",
      clientSecret:
        "9b3c4230355b9576fe602ff7a5286f9e0b542348a01771ff3d5318d6ac53cd16",
      script: code,
      language,
      versionIndex,
      stdin,
    });
    setOutput(data);
  };

  return (
    <>
      <Menu mode="horizontal" style={{ margin: "10px" }}>
        <Menu.Item
          onClick={() => {
            setIdeSettings("python", "python3", 3);
          }}
          icon={<FaPython />}
          key="python3"
        >
          Python 3.7
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            setIdeSettings("", "cpp17", 0);
          }}
          icon={<SiCplusplus />}
          key="cpp"
        >
          C++ 17
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("java", "java", 3);
          }}
          icon={<SiJava />}
          key="java"
        >
          Java 11
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("", "dart", 3);
          }}
          icon={<SiDart />}
          key="dart"
        >
          Dart
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("javascript", "nodejs", 3);
          }}
          icon={<SiNodeDotJs />}
          key="nodejs"
        >
          Nodejs
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("", "swift", 3);
          }}
          icon={<SiSwift />}
          key="swift"
        >
          Swift
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("", "kotlin", 2);
          }}
          icon={<SiKotlin />}
          key="kotlin"
        >
          Kotlin
        </Menu.Item>
        <Menu.Item
          icon={<DiSqllite />}
          onClick={() => {
            setIdeSettings("", "sql", 3);
          }}
          key="sql"
        >
          Sql
        </Menu.Item>
        <Menu.Item
          icon={<SiCsharp />}
          onClick={() => {
            setIdeSettings("csharp", "csharp", 2);
          }}
          key="csharp"
        >
          Csharp
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("golang", "go", 3);
          }}
          key="go"
        >
          Go lang
        </Menu.Item>
      </Menu>
      <Card title="Standard input" style={{ margin: "10px" }}>
        <Input.TextArea
          value={stdin}
          rows={4}
          onChange={(e) => setStdin(e.target.value)}
        ></Input.TextArea>
      </Card>
      <Row justify="center">
        <Button onClick={getOutput}>Exectute</Button>
      </Row>

      <Row style={{ marginTop: 30 }} justify="space-around">
        <Col span={10} style={{ zIndex: 0 }}>
          <AceEditor
            placeholder="Write code here"
            mode={languageMode}
            value={code}
            theme="monokai"
            name="blah2"
            onChange={onChange}
            fontSize={20}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: languageMode !== "",
              enableLiveAutocompletion: languageMode !== "",
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </Col>
        <Col span={10}>
          <Card
            extra={<Button onClick={() => setOutput("")}>Clear</Button>}
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
