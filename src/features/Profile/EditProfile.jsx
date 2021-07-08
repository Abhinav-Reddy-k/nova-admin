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
import { classesOptions } from "../../app/subjectsApi";

import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectProfileData } from "./profileSlice";
import { editProfileData } from "../../app/firebase/firestore/teachersCollection";
import { selectUid } from "../auth/authSlice";
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

const EditProfile = () => {
  const profileData = useSelector(selectProfileData);
  let classes = [];
  profileData.classes.forEach((classObj) =>
    classes.push([
      classObj.branch,
      classObj.year,
      classObj.section,
      classObj.subject,
    ])
  );
  const initialData = {
    address: profileData.address,
    phone: profileData.phone,
    classes: classes,
  };

  const history = useHistory();
  const uid = useSelector(selectUid);
  const onFinish = async (val) => {
    try {
      await editProfileData({ ...val, uid });
      message.success("Successfully Changed");
      history.replace("/home/myprofile");
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={15}>
          <Typography.Title level={4} align="center">
            Edit Profile Data
          </Typography.Title>
          <Typography.Title level={5} type="secondary" align="center">
            Please input your data
          </Typography.Title>

          <Form
            initialValues={initialData}
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
                            message:
                              "Please input a class or delete this field.",
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
    </>
  );
};

export default EditProfile;