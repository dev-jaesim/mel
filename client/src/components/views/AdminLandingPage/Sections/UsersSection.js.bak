import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Table, Form, Input, Button, Select } from "antd";
import "./AdminSection.css";

const { Option } = Select;

function UsersSection() {
  const [form] = Form.useForm();
  const [keywords, setKeywords] = useState({
    email: null,
    grade: null,
    role: 0,
  });
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <Link to={`/users/${record.key}`}>{text}</Link>,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      sorter: (a, b) => a.grade - b.grade,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${USER_SERVER}?email=${keywords.email}&grade=${keywords.grade}&role=${keywords.role}`
      )
      .then((response) => {
        setUsers(
          response.data.map((v) => {
            return {
              key: v._id,
              email: v.email,
              grade: v.grade,
              firstName: v.firstName,
              lastName: v.lastName,
            };
          })
        );
      });
  }, [keywords]);

  const onFinish = (values) => {
    setKeywords({ ...values, role: 0 });
  };

  return (
    <div className="min-height-100">
      <div className="users-section-search">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="grade">
            <Select placeholder="Enter a grade">
              <Option value={null}>- Select Grade -</Option>
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
              Find
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
        className="content-center width-80"
      />
    </div>
  );
}

export default UsersSection;
