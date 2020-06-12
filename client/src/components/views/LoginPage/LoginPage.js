import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { Link } from "react-router-dom";
import "./Login.css";

const { Title } = Typography;

function LoginPage(props) {
  message.config({
    top: 100,
  });

  const dispatch = useDispatch();
  const checkValueOfRememerMe = localStorage.getItem("rememberMe")
    ? true
    : false;

  const [rememberMe, setRememberMe] = useState(checkValueOfRememerMe);
  const handleRememberMe = (e) => {
    setRememberMe(!rememberMe);
  };

  const storedEmail = localStorage.getItem("rememberMe");

  const onFinish = (values) => {
    const formData = {
      email: values.Email,
      password: values.Password,
    };

    dispatch(loginUser(formData)).then((response) => {
      if (response.payload.loginSuccess) {
        if (rememberMe) {
          window.localStorage.setItem("rememberMe", formData.email);
        } else {
          localStorage.removeItem("rememberMe");
        }
        props.history.push("/");
      } else {
        message.error(response.payload.message);
      }
    });
  };

  return (
    <Row justify="center" className="margin-y-5">
      <Col lg={10} className="login-padding bgc-blue">
        <div className="font-color-white font-size-2">
          My Private Ai Tutor,
          <br />
          Any Where Any Time.
        </div>
        <div className="font-color-white-transparent font-size-1p2">
          <br />
          Free Diagnostic Assessment, <br />
          Right Level Tutoring,
          <br />
          Excellent Reporting
        </div>
      </Col>
      <Col lg={10} className="login-padding bgc-white">
        <div>
          <Title level={2}>LOGIN</Title>
        </div>
        <div>
          <Form onFinish={onFinish} initialValues={{ Email: storedEmail }}>
            <Form.Item
              name={"Email"}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input type="email" placeholder="Enter E-mail" />
            </Form.Item>
            <Form.Item
              name={"Password"}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Checkbox
              onClick={handleRememberMe}
              checked={rememberMe}
              style={{ marginLeft: "1rem" }}
            >
              Remember me
            </Checkbox>
            <Form.Item style={{ textAlign: "center" }}>
              <Link to="/register" className="font-color-black">
                <SmileOutlined style={{ color: "black" }} />
                &nbsp;
                <span className="font-color-black">
                  Don't you have an account?
                </span>
                &nbsp;&nbsp;
                <span className="font-color-red">Sign up</span>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default LoginPage;
