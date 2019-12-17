import React from "react";
import { Modal, Button } from "antd";

const ModalItemOptions = ({ visibleModal, handleCancelModal }) => {
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
        <Button className="modal__content--btn btn-red">Delete</Button>
        <Button className="modal__content--btn" onClick={handleCancelModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalItemOptions;
