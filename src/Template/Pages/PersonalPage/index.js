import React from "react";
import { Row, Col } from "antd";
import Profile from "./Profile";
import Highlights from "./Highlights";
import TabControl from "./TabControl";
import Follows from "./Profile/Follows";
import "./personalPage.scss";

const PersonalPage = () => {
  return (
    <div className="personal">
      <Profile />
      <Highlights />
      <Row>
        <Col xs={24} sm={24} md={0}>
          <Follows />
        </Col>
      </Row>
      <TabControl />
    </div>
  );
};

export default PersonalPage;
