import React from "react";
import { Row, Col } from "antd";
import HeaderItem from "./HeaderItem";
import ImageItem from "./ImageItem";
import InfoItem from "./InfoItem";
import "./postItem.scss";

const PostItem = ({ src, owner, ...restProps }) => {
  console.log(restProps);

  return (
    <Row className="post-item">
      <Col xs={24} sm={24} md={0}>
        <HeaderItem owner={owner} />
      </Col>
      <Col xs={24} sm={16}>
        <ImageItem src={src} />
      </Col>
      <Col xs={24} sm={8}>
        <div className="post-item__info">
          <Row>
            <Col xs={0} sm={0} md={24}>
              <HeaderItem owner={owner} />
            </Col>
          </Row>
          <InfoItem {...restProps} owner={owner} />
        </div>
      </Col>
    </Row>
  );
};

export default PostItem;
