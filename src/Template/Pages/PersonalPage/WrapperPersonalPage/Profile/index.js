import React from "react";
import { Row, Col } from "antd";

import AvatarProfile from "./AvatarProfile";
import EditAccounts from "./EditAccounts";
import Follows from "./Follows";
import DescriptionProfile from "./DescriptionProfile";

const Profiles = ({ handleToggleSuggested = () => {} }) => {
  return (
    <div className="personal__profile">
      <Row>
        <Col xs={24} sm={0} md={0}>
          <AvatarProfile />
        </Col>
        <Col xs={0} sm={6} md={8}>
          <AvatarProfile />
        </Col>
        <Col xs={24} sm={18} md={16}>
          <Row gutter={24} className="m-0">
            <EditAccounts handleToggleSuggested={handleToggleSuggested} />
          </Row>
          <Row>
            <Col xs={0} sm={0} md={24}>
              <Follows />
            </Col>
          </Row>
          <Row>
            <Col xs={0} sm={0} md={24}>
              <DescriptionProfile />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={0}>
          <DescriptionProfile />
        </Col>
      </Row>
    </div>
  );
};

export default Profiles;
