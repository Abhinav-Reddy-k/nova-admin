import { Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

import { sendPasswordReset } from "../../app/firebase/authService";

function ResetPassword() {
  const onFinish = async (values) => {
    try {
      await sendPasswordReset(values.email);
      message.success("Password reset email sent!");
    } catch (err) {
      message.error(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row align="middle" justify="space-around">
      <Col span={12}>
        <Form
          name="normal_login"
          labelAlign="left"
          initialValues={{
            remember: true,
          }}
          labelCol={{ span: 5 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<AiOutlineUser className="site-form-item-icon" />}
              placeholder="example@gmail.com"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="reset-password-form-button"
            >
              Send rest link
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ResetPassword;
