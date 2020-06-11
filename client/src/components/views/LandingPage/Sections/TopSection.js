import React from "react";
import { Row, Col, Button } from "antd";

function TopSection() {
  return (
    <Row gutter={32} className="container-padding bgc-white">
      <Col lg={12} xs={24} className="main-img-container">
        <img className="main-img" src="img/main.jpg" alt="main" />
      </Col>
      <Col lg={12} xs={24}>
        <div className="main-slogan">
          <span>
            My Private Ai Tutor,
            <br />
            Any Where Any Time.
          </span>
        </div>
        <div className="main-slogan-detail">
          <span>
            Free Diagnostic Assessment,
            <br />
            Right Level Tutoring, <br />
            Excellent Reporting
          </span>
        </div>
        <Row>
          <Col lg={12} xs={24}>
            <Button type="primary" className="main-slogan-btn">
              Learners
            </Button>
          </Col>
          <Col lg={12} xs={24}>
            <Button type="primary" className="main-slogan-btn">
              Teachers
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TopSection;
