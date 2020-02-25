import React from "react";
import { Col } from "antd";

const Username = ({ username = "", isVerified = false }) => {
  return (
    <>
      <Col>
        <h1 className="username">{username}</h1>
      </Col>
      {isVerified && (
        <Col>
          <span className="verified" title="Verified">
            Verified
          </span>
        </Col>
      )}
    </>
  );
};

export default Username;
