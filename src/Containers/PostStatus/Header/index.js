import React from "react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PostHeader = ({ isClearStatus = false, clearStatus = () => {} }) => {
  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure clear your post ?",
      okText: "Clear",
      cancelText: "Cancel",
      onOk() {
        clearStatus();
      }
    });
  };

  return (
    <div className="post-status__content--header">
      <h1>Post status</h1>
      {isClearStatus && (
        <Button onClick={confirm} className="btn-cancel-post">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      )}
    </div>
  );
};

export default PostHeader;
