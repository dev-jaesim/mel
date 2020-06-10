import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, logoutUser } from "../../../_actions/user_actions";

const { Search } = Input;

function NavPage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [courseOpen, setCourseOpen] = useState(false);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const handleCourseOpen = () => {
    setCourseOpen(!courseOpen);
  };

  const handleLogout = (e) => {
    dispatch(logoutUser()).then(async (response) => {
      if (response.payload.success) {
        await window.location.reload(false);
      }
    });
  };

  if (userState.info.isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
      </div>
    );
  } else {
    return (
      <>
        <nav className="main-nav">
          <Row align="middle">
            <Col span={4} className="text-align-center">
              <span onClick={handleCourseOpen}>
                COURSES{" "}
                {courseOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
              </span>
            </Col>
            <Col span={4}>
              <Search
                placeholder="input search text"
                onSearch={(value) => console.log(value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={8} className="text-align-center">
              <Link to="/">
                <span>
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
                <span onClick={handleLogout}>LOG OUT</span>
              )}
            </Col>
          </Row>
        </nav>
        <Row
          justify="space-between"
          className={courseOpen ? "coursebar open" : "coursebar"}
        >
          <Col span={6} className="course-padding">
            English
            <hr style={{ color: "#333" }} />
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
          </Col>
          <Col span={6} className="course-padding">
            Math
            <hr />
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
          </Col>
          <Col span={6} className="course-padding">
            GA
            <hr />
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
          </Col>
          <Col span={6} className="course-padding">
            Writing
            <hr />
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
            <p>menu ....</p>
          </Col>
        </Row>
      </>
    );
  }
}

export default NavPage;
