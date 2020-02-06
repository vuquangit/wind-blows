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
      const response = await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/post/comments/delete`,
        data: {
          postId: commentId,
          userId: viewerId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("fetch delete comments ", response);

      handleDeleteComments(commentId);
      handleCancelModal();
    } catch (err) {
      console.log(err);
      message.error("Comments this post error");
    } finally {
      setIsLoading(false);
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
        <Button className="modal__content--btn btn-red">Report</Button>
        {canDeleteComment && (
          <Button
            className="modal__content--btn btn-red"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
        <Button className="modal__content--btn" onClick={handleCancelModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalItemOptions;
