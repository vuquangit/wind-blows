import React from "react";
import { Col } from "antd";

const Username = ({ username = "", isVerified = false }) => {
  return (
    <div className="profile-username">
      <Col>
        <h1 className="profile-username__text">{username}</h1>
      </Col>
      {isVerified && (
        <Col>
          <span className="sprite-icon__core verified__normal" title="Verified">
            Verified
          </span>
        </Col>
      )}
    </div>
  );
};

export default Username;
