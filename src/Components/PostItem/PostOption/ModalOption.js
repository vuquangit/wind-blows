import React from "react";
import { Modal, Button } from "antd";
import { Link } from "react-router-dom";

const ModalOption = ({ visibleModal, handleCancelModal, postId }) => {
  return (
    <Modal
      title={null}
      visible={visibleModal}
      onCancel={handleCancelModal}
      className="PI__PO--modal"
      footer={null}
      closable={false}
      centered={true}
    >
      <div className="modal__content">
        <Button className="modal__content--btn btn-red">Report</Button>
        <Button className="modal__content--btn btn-red">Unfollow</Button>
        <Button className="modal__content--btn">
          <Link to={`/p/${postId}`}>Go to post</Link>
        </Button>
        <Button className="modal__content--btn">Embed</Button>
        <Button className="modal__content--btn">Share</Button>
        <Button className="modal__content--btn">Copy Link</Button>
        <Button className="modal__content--btn" onClick={handleCancelModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOption;
