import React from "react";
import { Row, Col } from "antd";
import MenuAccount from "../MenuAccount";
import "./wrapperAccount.scss";

const WrapperMenuAccount = ({ children }) => {
  return (
    <div className="wrapper-account">
      <Row type="flex">
        <Col xs={0} md={6} flex={1}>
          <div className="wrapper-account__menu">
            <MenuAccount />
          </div>
        </Col>
        <Col xs={24} md={18}>
          <div className="wrapper-account__children">{children}</div>
        </Col>
      </Row>
    </div>
  );
};

export default WrapperMenuAccount;
