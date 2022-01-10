import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { Input } from "antd";
import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Space } from "antd";
import { Button } from "antd";
import "./loginStyles.css";

const LoginUi = ({
  onLoginWithEmailPassword,
  onAuthProviderLogin,
  onRegister,
  onForgotPassword,
}) => {
  return (
    <div className="bg">
      <h2 className="flux" style={{ margin: "60px 0 0 60px" }}>
        NOVA-ADMIN
      </h2>

      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <Form
          name="login"
          labelAlign="left"
          initialValues={{
            remember: true,
          }}
          labelCol={{ span: 7 }}
          onFinish={onLoginWithEmailPassword}
        >
          <Form.Item
            name="email"
            label={<p className="form-label">Email</p>}
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
              prefix={<AiOutlineUser />}
              placeholder="example@gmail.com"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<p className="form-label">Password</p>}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 5,
                message: "Min 5 characters required",
              },
            ]}
          >
            <Input.Password prefix={<AiOutlineLock />} type="password" />
          </Form.Item>

          <Form.Item onClick={onForgotPassword}>Forgot password</Form.Item>
          <Space size="large">
            <Form.Item>
              <Button htmlType="submit" className="button">
                Log in
              </Button>
              <Button className="button" onClick={onRegister}>
                register now!
              </Button>
            </Form.Item>

            <Button
              size="large"
              type="ghost"
              className="button"
              onClick={() => onAuthProviderLogin("google")}
              icon={<AiOutlineGoogle size={30} />}
            />
            <Button
              size="large"
              className="button"
              type="ghost"
              icon={<AiFillGithub size={30} />}
            />
          </Space>
        </Form>
      </div>
    </div>
  );
};

LoginUi.propTypes = {
  onLoginWithEmailPassword: PropTypes.func.isRequired,
  onAuthProviderLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};

export default LoginUi;
