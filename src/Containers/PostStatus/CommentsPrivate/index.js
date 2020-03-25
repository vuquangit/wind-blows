import React from "react";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";

const PostCommentsPrivate = ({ commentsDisabled = false, setStatus }) => {
  const handleSwitchChange = (checked, event) => {
    setStatus(prevState => ({
      ...prevState,
      commentsDisabled: checked
    }));
  };

  return (
    <div className="post-status__content--comments-private">
      <FontAwesomeIcon icon={faCommentSlash} />
      <div>Disable comments:</div>
      <Switch checked={commentsDisabled} onChange={handleSwitchChange} />
    </div>
  );
};

export default PostCommentsPrivate;
