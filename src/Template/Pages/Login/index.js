import React from "react";
import { Row, Col } from "antd";
import Signup from "./Signup";
import PanelImage from "./PanelImage";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <Row className="login__content">
        <Col xs={0} sm={0} md={12}>
          <PanelImage />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Signup />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
