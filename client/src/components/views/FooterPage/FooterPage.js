import React from "react";
import { Row, Col } from "antd";
import "./Footer.css";

function FooterPage() {
  return (
    <Row gutter={48} className="container-padding footer-bgc">
      <Col className="gutter-row" span={8}>
        <p className="font-color-white-transparent font-size-1p2">
          Our mission is to provide a free, world-class education to anyone,
          anywhere.
        </p>
        <br />
        <p className="font-color-white-transparent font-size-1p2">
          <span className="font-color-white">MRT Edu Lab</span> &{" "}
          <span className="font-color-white">MRT Robotics</span> have been
          providing the best STEM Education across the world
        </p>
      </Col>
      <Col className="gutter-row" span={2}></Col>
      <Col className="gutter-row" span={8}>
        <Row gutter={16} className="font-color-white">
          <Col className="gutter-row" span={8}>
            <p>About</p>
            <p>News</p>
            <p>Help</p>
          </Col>
          <Col className="gutter-row" span={8}>
            <p>Courses</p>
            <p>Math</p>
            <p>English</p>
            <p>GA</p>
          </Col>
          <Col className="gutter-row" span={8}>
            <p>Tests</p>
            <p>Naplan</p>
            <p>OC</p>
            <p>Selective</p>
          </Col>
        </Row>
      </Col>
      <Col className="gutter-row" span={6}></Col>
    </Row>
  );
}

export default FooterPage;
