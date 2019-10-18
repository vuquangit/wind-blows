import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Row, Col } from "antd";

export default function Header() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fff",
          padding: 0
        }}
      >
        <Content>
          <Row>
            <Col xs={12} sm={6} md={8}>
              The Wind Blows
            </Col>
            <Col xs={0} sm={10} md={8}>
              Search
            </Col>
            <Col xs={12} sm={8} md={8}>
              Profile User
            </Col>
          </Row>
        </Content>
      </Header>
    </Layout>
  );
}
