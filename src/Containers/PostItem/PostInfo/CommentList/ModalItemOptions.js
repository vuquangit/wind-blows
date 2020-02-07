import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import axios from "axios";

const ModalItemOptions = ({
  commentOwnerId = "",
  commentId = "",
  postOwnerId = "",
  visibleModal = false,
  handleCancelModal = () => {},
  handleDeleteComments = () => {}
}) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );

  const canDeleteComment = isEqual(viewerId, postOwnerId)
    ? true
    : isEqual(viewerId, commentOwnerId);

  // delete comments
  const [isLoading, setIsLoading] = useState(false);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/post/comments/delete`,
        data: {
          commentsId: commentId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      handleDeleteComments(commentId);
      setIsLoading(false);
      handleCancelModal();
    } catch (err) {
      setIsLoading(false);

      console.log(err);
      message.error("Comments this post error");
    }
  };

  return (
    <Modal
      title={null}
      visible={visibleModal}
      onCancel={handleCancelModal}
      className="PI__PO--modal"
      footer={null}
      closable={false}
      centered
    >
      <div className="modal__content">
        <Button className="modal__content--btn btn-red" disabled={isLoading}>
          Report
        </Button>
        {canDeleteComment && (
          <Button
            className="modal__content--btn btn-red"
            onClick={() => handleDelete()}
            disabled={isLoading}
          >
            Delete
          </Button>
        )}
        <Button
          className="modal__content--btn"
          onClick={handleCancelModal}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalItemOptions;
