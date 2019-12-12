import React from "react";
import { Row, Col } from "antd";
import PostItem from "Components/PostItem";
// import postList from './mock.json'
import postList from "./_trangthuy.json";

const TabControl = () => {
  return (
    <div>
      <Row>Tab</Row>
      <Row>
        {postList.map((item, idx) => (
          <Col key={item.id || idx} span={8}>
            <PostItem {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TabControl;
