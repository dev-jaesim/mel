import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  Select,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import "./Register.css";

const { Title } = Typography;
const { Option } = Select;

function RegisterPage(props) {
  message.config({
    top: 100,
  });

  const dispatch = useDispatch();

  const onFinish = (values) => {
    const formData = {
      email: values.email,
      password: values.password,
      firstName:
        values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1),
      lastName:
        values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1),
      grade: values.grade,
    };

    dispatch(registerUser(formData)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        message.error(response.payload.message);
        // setErrorMessage(response.payload.message);
      }
    });
  };

  return (
    <Row justify="center" className="margin-y-5">
      <Col lg={10} className="register-padding bgc-blue">
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
      <Col lg={10} className="register-padding bgc-white">
        <div>
          <Title level={2}>SIGN UP</Title>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
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
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 7, message: "Password must be minimum 7 characters." },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm the password" />
          </Form.Item>

          <Row gutter={12}>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="grade"
            rules={[
              {
                required: true,
                message: "Please input your grade!",
              },
            ]}
          >
            <Select placeholder="Enter your grade">
              <Option value="k">Kindy</Option>
              <Option value="1">Year 1</Option>
              <Option value="2">Year 2</Option>
              <Option value="3">Year 3</Option>
              <Option value="4">Year 4</Option>
              <Option value="5">Year 5</Option>
              <Option value="6">Year 6</Option>
              <Option value="7">Year 7</Option>
              <Option value="8">Year 8</Option>
              <Option value="9">Year 9</Option>
              <Option value="10">Year 10</Option>
              <Option value="11">Year 11</Option>
              <Option value="12">Year 12</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default RegisterPage;
