import { Button, Form, Input, message, Space } from "antd";
import React from "react";
import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailPassword,
  socialLogin,
} from "../../app/firebase/authService";
import "./loginStyles.css";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    signInWithEmailPassword(values)
      .then((loginInfo) => {
        navigate("/home", { replace: true });
      })
      .catch((err) => message.error(err.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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

            <Form.Item>
              <Link to="/resetPassword">Forgot password</Link>
            </Form.Item>
            <Space size="large">
              <Form.Item>
                <Button htmlType="submit" className="button">
                  Log in
                </Button>
                <Link className="button" to={"/registration/register"}>
                  register now!
                </Link>
              </Form.Item>
              <Button
                size="large"
                type="ghost"
                className="button"
                onClick={() =>
                  socialLogin("google")
                    .then(message.success("Login Successful"))
                    .catch((err) => message.error(err.message))
                }
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
    </>
  );
}

export default Login;
