import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import {
  Table,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Spin,
  Popconfirm,
  message,
} from "antd";
import "./AdminSection.css";

const { Option } = Select;

function UsersSection() {
  message.config({
    top: 100,
  });
  const [form] = Form.useForm();
  const [keywords, setKeywords] = useState({
    email: null,
    grade: null,
    role: 0,
  });
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [individual, setIndividual] = useState(null);

  const loadIndivisual = (userId) => {
    axios
      .get(`${USER_SERVER}?_id=${userId}`)
      .then((response) => setIndividual(response.data[0]));
  };

  const showModal = (userId) => {
    loadIndivisual(userId);
    setVisible(true);
  };

  const handleClose = () => {
    setIndividual(null);
    setVisible(false);
  };

  const columns = [
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <span className="open-user-modal" onClick={() => showModal(record.key)}>
          {text}
        </span>
      ),
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
  }, [keywords, individual]);

  const onFinish = (values) => {
    setKeywords({ ...values, role: 0 });
  };

  const onUpdate = (values) => {
    axios.put(`${USER_SERVER}/update`, values);
    setIndividual(null);
    setVisible(false);
  };

  function popConfirm(e) {
    axios.delete(`${USER_SERVER}/delete`, {
      data: { email: individual.email },
    });
    setIndividual(null);
    setVisible(false);
    message.success("The user has been successfully removed");
  }

  function popCancel(e) {
    message.error("Removing the user has been canceled");
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 14 },
  };

  return (
    <div className="min-height-100">
      <div className="users-section-search">
        <Form form={form} layout="inline" onFinish={onFinish}>
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
      <Modal
        title="User Details"
        visible={visible}
        closable={false}
        footer={[
          <Button key="close" type="primary" onClick={handleClose}>
            CLOSE
          </Button>,
        ]}
      >
        {individual === null ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
          <Form
            {...layout}
            onFinish={onUpdate}
            initialValues={{
              email: individual.email,
              firstName: individual.firstName,
              lastName: individual.lastName,
              grade: individual.grade,
            }}
          >
            <Form.Item name="email" label="E-mail: ">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="firstName" label="First Name: ">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name: ">
              <Input />
            </Form.Item>
            <Form.Item name="grade" label="Grade: ">
              <Select>
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
            <Form.Item {...buttonItemLayout}>
              <Popconfirm
                title="Are you sure delete this user?"
                onConfirm={popConfirm}
                onCancel={popCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger className="margin-right-p5">
                  DELETE
                </Button>
              </Popconfirm>
              <Button type="primary" htmlType="submit">
                UPDATE
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default UsersSection;
