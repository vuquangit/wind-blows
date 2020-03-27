import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import axios from "utils/axiosConfig";

const ModalItemOptions = ({
  commentOwnerId = "",
  commentId = "",
  postOwnerId = "",
  visibleModal = false,
  handleCancelModal = () => {},
  handleDeleteComment = () => {}
}) => {
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );

  const canDeleteComment = isEqual(viewerId, postOwnerId)
    ? true
    : isEqual(viewerId, commentOwnerId);

  // delete comments
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      await axios({
        method: "post",
        url: "/post/comments/delete",
        data: {
          commentsId: commentId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      setIsLoading(false);
      handleCancelModal();
      handleDeleteComment(commentId);
      // console.log("deleted comment");
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
