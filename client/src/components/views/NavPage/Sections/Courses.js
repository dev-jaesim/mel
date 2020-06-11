import React from "react";
import { Row, Col } from "antd";

function Courses() {
  return (
    <Row justify="space-between">
      <Col span={6} className="course-padding">
        English
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
  );
}

export default Courses;
