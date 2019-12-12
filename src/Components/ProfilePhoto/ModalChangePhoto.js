import React from "react";
import { Modal, Button } from "antd";

const ModalChangePhoto = ({ visibleModal, handleCancelModal }) => {
  return (
    <Modal
      title={"Change Profile Photo"}
      visible={visibleModal}
      onCancel={handleCancelModal}
      className="profile-photo__modal"
      footer={null}
      closable={false}
      centered={true}
    >
      <div className="profile-photo__modal--content">
        <Button className="modal-btn btn-upload">Upload Photo</Button>
        <Button className="modal-btn btn-remove">Remove Current Photo</Button>
        <Button className="modal-btn btn-cancel" onClick={handleCancelModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChangePhoto;
