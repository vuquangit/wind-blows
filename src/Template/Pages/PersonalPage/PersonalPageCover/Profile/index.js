import React from "react";
import { Row, Col } from "antd";
import Avatar from "./Avatar";
import Username from "./Username";
import Follows from "./Follows";
import Description from "./Description";

const Profiles = () => {
  return (
    <div className="personal__header">
      <Row>
        <Col xs={6} sm={6} md={8}>
          <Avatar />
        </Col>
        <Col xs={18} sm={18} md={16}>
          <Row gutter={24} className="m-0">
            <Username />
          </Row>
          <Row>
            <Col xs={0} sm={0} md={24}>
              <Follows />
            </Col>
          </Row>
          <Row>
            <Col xs={0} sm={0} md={24}>
              <Description />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={0}>
          <Description />
        </Col>
      </Row>
    </div>
  );
};

export default Profiles;
