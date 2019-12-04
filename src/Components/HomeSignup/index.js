import React from "react";
import { Row, Col } from "antd";
import PanelImage from "./PanelImage";
import EmailSignup from "Template/Pages/Accounts/EmailSignup";
import "./homeSignup.scss";

const HomeSignup = () => {
  return (
    <div className="home-signup">
      <Row>
        <Col xs={0} sm={0} md={12}>
          <PanelImage />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <EmailSignup />
        </Col>
      </Row>
    </div>
  );
};

export default HomeSignup;
