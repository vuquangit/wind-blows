import React from "react";
import { Row } from "antd";
import PostItem from "Components/PostItem";
import postList from "./mock.json";

const TabControl = () => {
  return (
    <div>
      <Row>Tab</Row>
      <Row>
        {postList.map((item, idx) => (
          <PostItem key={item.id || idx} {...item} />
        ))}
      </Row>
    </div>
  );
};

export default TabControl;
