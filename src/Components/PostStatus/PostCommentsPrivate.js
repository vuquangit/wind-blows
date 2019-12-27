import React from "react";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";

const PostCommentsPrivate = () => {
  return (
    <div className="post-status__content--comments-private">
      <FontAwesomeIcon icon={faCommentSlash} />
      <div>Disable comments:</div>
      <Switch defaultChecked />
    </div>
  );
};

export default PostCommentsPrivate;
