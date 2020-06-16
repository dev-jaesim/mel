import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Avatar, Drawer } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, logoutUser } from "../../../_actions/user_actions";
import Couses from "./Sections/Courses";
import Tests from "./Sections/Tests";

function NavPage(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [courseOpen, setCourseOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const handleCourseOpen = () => {
    setCourseOpen(!courseOpen);
  };

  const handleTestOpen = () => {
    setTestOpen(!testOpen);
  };

  const handleLogout = (e) => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        props.history.push("/");
        window.location.reload(false);
      }
    });
  };

  if (userState.info.isLoading) {
    return <div />;
  } else {
    return (
      <>
        <nav className="main-nav">
          <Row align="middle">
            <Col span={4} className="text-align-center">
              <span onClick={handleCourseOpen}>
                COURSES
                {courseOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
              </span>
            </Col>
            <Col span={4} className="text-align-center">
              <span onClick={handleTestOpen}>
                TESTS
                {testOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
              </span>
            </Col>
            <Col span={8} className="text-align-center">
              <Link to="/">
                <span>
                  <img src="img/logo.png" alt="logo" style={{ width: "10%" }} />{" "}
                  &nbsp;&nbsp;
                  <strong>MRT EDU LAB</strong>
                </span>
              </Link>
            </Col>
            <Col span={4} className="text-align-right">
              {userState.info.isAuth === false ? (
                <Link to="/login">
                  <span>LOG IN</span>
                </Link>
              ) : (
                <div></div>
              )}
            </Col>
            <Col span={4} className="text-align-center">
              {userState.info.isAuth === false ? (
                <Link to="register">
                  <span>SIGN UP</span>
                </Link>
              ) : (
                <>
                  <Avatar
                    onClick={showDrawer}
                    size="large"
                    style={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                    }}
                  >
                    {userState.info.firstName.charAt(0)}
                  </Avatar>
                  <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                  >
                    <div>
                      <span onClick={handleLogout} className="pointer-cursor">
                        LOG OUT
                      </span>
                    </div>
                  </Drawer>
                </>
              )}
            </Col>
          </Row>
        </nav>
        <div className={courseOpen ? "coursebar open" : "coursebar"}>
          <Couses />
        </div>
        <div className={testOpen ? "coursebar open" : "coursebar"}>
          <Tests />
        </div>
      </>
    );
  }
}

export default withRouter(NavPage);
