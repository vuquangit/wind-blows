import React from "react";
import { Layout, Row, Col } from "antd";

import "./header.scss";
import Brand from "./Brand";
import Search from "./Search";
import Menu from "./Menu";

export default function Header() {
  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="header__content">
        <Row className="header__content--row">
          <Col xs={12} sm={6} md={8}>
            <Brand />
          </Col>
          <Col xs={0} sm={10} md={8}>
            <Search />
          </Col>
          <Col xs={12} sm={8} md={8}>
            <Menu />
          </Col>
        </Row>
      </div>
    </Header>
  );
}
