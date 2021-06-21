import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Typography,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { setTeacherProfileData } from "../../app/firebase/firestore/teachersCollection";
import { classesOptions } from "../../app/subjectsApi";
import { selectCurrentUser } from "../auth/authSlice";

import "./TeachersProfileStyles.css";

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

const TeachersProfile = () => {
  const teacherAuthData = useSelector(selectCurrentUser);

  const onFinish = async (val) => {
    try {
      await setTeacherProfileData({ ...val, ...teacherAuthData });
      message.success("Successfully Registered");
      window.location.reload();
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  };

  return (
    <Row justify="space-around" align="middle">
      <Col span={15}>
        <Typography.Title level={4} align="center">
          Teachers Profile Data
        </Typography.Title>
        <Typography.Title level={5} type="secondary" align="center">
          Please input your data
        </Typography.Title>

        <Form
          name="dynamic_form_item"
          {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
        >
          <Form.List
            name="classes"
            rules={[
              {
                validator: async (_, classes) => {
                  if (!classes || classes.length < 1) {
                    return Promise.reject(new Error("At least 1 class"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "Classes" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input a class or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Cascader
                        options={classesOptions}
                        style={{ maxWidth: 300 }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Add Subject
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item
            {...formItemLayout}
            name="phone"
            label="Phone"
            rules={[{ type: "number" }, { required: true }]}
          >
            <InputNumber style={{ minWidth: 150 }} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            {...formItemLayout}
            rules={[{ required: true }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default TeachersProfile;
