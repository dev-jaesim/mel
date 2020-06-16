import React, { useState } from "react";
import { Layout, Menu, Spin } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function AdminLandingPage(props) {
  const userState = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (userState.info.isAdmin === undefined) {
    if (!userState.info.isAuth) {
      props.history.push("/");
    }
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  } else if (!userState.info.isAdmin || !userState.info.isAuth) {
    props.history.push("/");
  } else {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>Admin Page</Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminLandingPage;
