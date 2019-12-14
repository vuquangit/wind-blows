import React from "react";
import { Row, Col } from "antd";
import PersonalPost from "./PersonalPost";
import postList from "./changgio.json";
import "./tabControl.scss";

const TabControl = () => {
  return (
    <div>
      <Row>Tab</Row>
      <Row>
        {postList.map((item, idx) => (
          <Col key={item.id || idx} span={8}>
            <PersonalPost {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TabControl;
