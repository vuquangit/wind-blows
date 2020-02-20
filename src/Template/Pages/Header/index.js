import React from "react";
import { Layout, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";

import Brand from "./Brand";
import Search from "./Search";
import Menu from "./Menu";
import "./header.scss";

const Header = ({ isScrolled = false }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 636px)" });

  return (
    <Layout.Header className="header">
      <div className="header__content">
        <Row className="header__content--row">
          <Col xs={12} sm={6} md={8}>
            <Brand />
          </Col>
          <Col xs={0} sm={10} md={8}>
            <Search isSmallScreen={isSmallScreen} isScrolled={isScrolled} />
          </Col>
          <Col xs={12} sm={8} md={8}>
            <Menu isSmallScreen={isSmallScreen} />
          </Col>
        </Row>
      </div>
    </Layout.Header>
  );
};

export default Header;
