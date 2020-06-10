import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Landing.css";

function LandingPage() {
  const userState = useSelector((state) => state.user);

  if (userState.info.isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
      </div>
    );
  } else {
    return (
      <div className="container-padding">
        <Row gutter={32}>
          <Col lg={12} xs={24} className="main-img-container">
            <img className="main-img" src="img/main.jpg" alt="main" />
          </Col>
          <Col lg={12} xs={24}>
            <div className="main-slogan">
              <span>
                For every student,
                <br />
                every classroom.
                <br />
                Real results.
              </span>
            </div>
            <div className="main-slogan-detail">
              <span>
                We proudly provide the world best online tutoring!! We proudly
                provide the world best online tutoring!!
              </span>
            </div>
            <Row>
              <Col lg={8} xs={24}>
                <Button type="primary" className="main-slogan-btn">
                  Learners
                </Button>
              </Col>
              <Col lg={8} xs={24}>
                <Button type="primary" className="main-slogan-btn">
                  Teachers
                </Button>
              </Col>
              <Col lg={8} xs={24}>
                <Button type="primary" className="main-slogan-btn">
                  Parents
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LandingPage;
