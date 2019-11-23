import React from "react";
import { Modal, Row, Col } from "antd";
import HeaderItem from "./HeaderItem";
import ImageItem from "./ImageItem";
import InfoItem from "./InfoItem";
import OptionItem from "./OptionItem";
import "./modalItem.scss";

const ModalItem = ({
  visible,
  handleCancelModal,
  src,
  owner,
  ...restProps
}) => {
  console.log(owner, restProps);

  return (
    <Modal
      title={" "}
      visible={visible}
      onCancel={handleCancelModal}
      footer={null}
      className="modal-item"
    >
      <Row>
        <Col xs={24} sm={16} md={16}>
          <ImageItem src={src} />
        </Col>
        <Col xs={24} sm={8} md={8}>
          <HeaderItem owner={owner} />
          <InfoItem {...restProps} owner={owner} />
          <OptionItem />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalItem;
