import React, { useState } from "react";
import { Drawer, Button, Col, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_actions";

function NavPage() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onLogout = (e) => {
    dispatch(logoutUser()).then(async (response) => {
      if (response.payload.success) {
        await window.location.reload(false);
      }
    });
  };

  return (
    <nav
      style={{
        position: "fixed",
        width: "100%",
        top: "0",
        padding: ".5rem",
        backgroundColor: "white",
        zIndex: "999999",
      }}
    >
      <Row type="flex" align="middle">
        <Col lg={2}>
          <Button
            type="primary"
            onClick={showDrawer}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "rgba(0,0,0,0.9)",
              fontSize: "1.5rem",
            }}
          >
            <MenuOutlined />
          </Button>
        </Col>
        <Col lg={5}>
          <Link to="/">MRT Edu Lab</Link>
        </Col>

        <Drawer
          title="Basic Drawer"
          placement="left"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Sign up</Link>
          </div>
          <div>
            <p onClick={onLogout} style={{ cursor: "pointer" }}>
              Log out
            </p>
          </div>
        </Drawer>
      </Row>
    </nav>
  );
}

export default NavPage;
