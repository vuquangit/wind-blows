import React from "react";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const PostLocation = () => {
  return (
    <div className="post-status__content--location">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="location__icon" />
      <Input placeholder="Location" />
    </div>
  );
};

export default PostLocation;
