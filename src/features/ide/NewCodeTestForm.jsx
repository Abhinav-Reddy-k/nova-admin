import React from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectClasses, selectProfileData } from "../Profile/profileSlice";
import { addNewCodingTest } from "../../app/firebase/firestore/codingCollection";
import { useHistory } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const NewCodeTestForm = () => {
  const classes = useSelector(selectClasses);
  const teacherProfile = useSelector(selectProfileData);
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    addNewCodingTest(values, teacherProfile);
    history.push("/home/test");
  };

  let options = classes.map((cls, index) => {
    return {
      label: `${cls.subject} (${cls.section})`,
      value: cls,
      key: index,
    };
  });
  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={15}>
          <Typography.Title level={4} align="center">
            Enter the code data
          </Typography.Title>
          <Typography.Title level={5} type="secondary" align="center">
            Please input your data
          </Typography.Title>
          <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Title"
              {...formItemLayout}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Problem Question"
              {...formItemLayout}
              rules={[{ required: true }]}
            >
              <Input.TextArea showCount />
            </Form.Item>
            <Form.List
              name="testCases"
              rules={[
                {
                  validator: async (_, testCases) => {
                    if (!testCases || testCases.length < 1) {
                      return Promise.reject(new Error("At least 1 testcase"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <>
                      <Form.Item
                        {...restField}
                        name={[name, "input"]}
                        fieldKey={[fieldKey, "input"]}
                        rules={[{ required: true, message: "Missing Input" }]}
                      >
                        <Input.TextArea
                          style={{ maxWidth: 300 }}
                          placeholder="Input"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "output"]}
                        fieldKey={[fieldKey, "output"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing corresponding Output",
                          },
                        ]}
                      >
                        <Input.TextArea
                          style={{ maxWidth: 300 }}
                          placeholder="Corresponding Output"
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Test Case
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item
              name="classData"
              rules={[{ required: true, message: "Select atleast one class" }]}
            >
              <Checkbox.Group options={options} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default NewCodeTestForm;
