import React from "react";
import { Row, Col } from "antd";
import { IdcardOutlined, BankOutlined, ToTopOutlined } from "@ant-design/icons";

function WhySection() {
  return (
    <div className="container-padding">
      <div className="main-slogan why-works-title">Why MRT Edu Lab Works</div>
      <Row justify="center" gutter={16} className="width-full margin-y-2">
        <Col className="gutter-row text-align-center" lg={6}>
          <IdcardOutlined className="font-size-10" />
        </Col>
        <Col className="gutter-row text-align-center" lg={6}>
          <BankOutlined className="font-size-10" />
        </Col>
        <Col className="gutter-row text-align-center" lg={6}>
          <ToTopOutlined className="font-size-10" />
        </Col>
      </Row>
      <Row justify="center" gutter={16} className="width-full margin-y-2">
        <Col className="gutter-row text-align-center font-color-black" lg={6}>
          <p className="font-size-1p5">Personalized learning</p>
          <br />
          <span>
            Students practice at their own pace, first filling in gaps in their
            understanding and then accelerating their learning.
          </span>
        </Col>
        <Col className="gutter-row text-align-center font-color-black" lg={6}>
          <p className="font-size-1p5">Trusted content</p>
          <br />
          <span>
            Created by experts, MRT Edu Lab’s library of trusted practice and
            lessons covers math, science, and more. Always free for learners and
            teachers.
          </span>
        </Col>
        <Col className="gutter-row text-align-center font-color-black" lg={6}>
          <p className="font-size-1p5">Tools to empower teachers</p>
          <br />
          <span>
            With MRT Edu Lab, teachers can identify gaps in their students’
            understanding, tailor instruction, and meet the needs of every
            student.
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default WhySection;
