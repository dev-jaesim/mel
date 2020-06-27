import React, { useEffect, useState } from "react";
import { Layout, Menu, Spin } from "antd";
import {
  ShoppingCartOutlined,
  DashboardOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  TrophyOutlined,
  DollarCircleOutlined,
  ExceptionOutlined,
  MailOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Dashboard from "./Sections/Dashboard";
import TransactionReport from "./Sections/TransactionReport";
import UsersSection from "./Sections/UsersSection";
import QuestionSection from "./Sections/QuestionSection";

const { Content, Sider, Footer } = Layout;

function AdminLandingPage(props) {
  const userState = useSelector((state) => state.user);
  const [selectedMenu, setSelectedMenu] = useState("1");

  useEffect(() => {
    if (userState.info.isAuth === false) {
      props.history.push("/");
    } else if (userState.info.isAuth === true) {
      if (userState.info.isAdmin === false) {
        props.history.push("/");
      }
    }
  }, [userState, props.history]);

  const handleSelectedMenu = (e) => {
    setSelectedMenu(e.key);
  };

  const renderContent = (selectedMenu) => {
    switch (selectedMenu) {
      case "1":
        return <Dashboard />;
      case "2":
        return <TransactionReport />;
      case "4":
        return <UsersSection />;
      case "5":
        return <QuestionSection />;
      default:
        return <Dashboard />;
    }
  };

  if (userState.info.isAuth === true && userState.info.isAdmin === true) {
    return (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: "5rem",
          }}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              icon={<DashboardOutlined />}
              onClick={handleSelectedMenu}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<ShoppingCartOutlined />}
              onClick={handleSelectedMenu}
            >
              Transaction Report
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<TeamOutlined />}
              onClick={handleSelectedMenu}
            >
              Groups
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UserOutlined />}
              onClick={handleSelectedMenu}
            >
              Users
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<FileAddOutlined />}
              onClick={handleSelectedMenu}
            >
              Questions
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<ReadOutlined />}
              onClick={handleSelectedMenu}
            >
              Subject
            </Menu.Item>
            <Menu.Item
              key="7"
              icon={<ProfileOutlined />}
              onClick={handleSelectedMenu}
            >
              Passages
            </Menu.Item>
            <Menu.Item
              key="8"
              icon={<CopyOutlined />}
              onClick={handleSelectedMenu}
            >
              Topic
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={<CopyOutlined />}
              onClick={handleSelectedMenu}
            >
              Sup Topic
            </Menu.Item>
            <Menu.Item
              key="10"
              icon={<QuestionCircleOutlined />}
              onClick={handleSelectedMenu}
            >
              Questions
            </Menu.Item>
            <Menu.Item
              key="11"
              icon={<FormOutlined />}
              onClick={handleSelectedMenu}
            >
              Exams
            </Menu.Item>
            <Menu.Item
              key="12"
              icon={<TrophyOutlined />}
              onClick={handleSelectedMenu}
            >
              Results
            </Menu.Item>
            <Menu.Item
              key="13"
              icon={<TeamOutlined />}
              onClick={handleSelectedMenu}
            >
              Students
            </Menu.Item>
            <Menu.Item
              key="14"
              icon={<DollarCircleOutlined />}
              onClick={handleSelectedMenu}
            >
              Cupons
            </Menu.Item>
            <Menu.Item
              key="15"
              icon={<ExceptionOutlined />}
              onClick={handleSelectedMenu}
            >
              Sales Report
            </Menu.Item>
            <Menu.Item
              key="16"
              icon={<MailOutlined />}
              onClick={handleSelectedMenu}
            >
              Mailbox
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              {renderContent(selectedMenu)}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>MRT EDU LAB ©2020</Footer>
        </Layout>
      </Layout>
    );
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  }
}

export default AdminLandingPage;
