import React from "react";
import { Modal, Row, Col } from "antd";
import HeaderItem from "./HeaderItem";
import ImageItem from "./ImageItem";
import InfoItem from "./InfoItem";
import "./modalItem.scss";

const ModalItem = ({
  visible,
  handleCancelModal,
  src,
  owner,
  ...restProps
}) => {
  return (
    <Modal
      title={" "}
      visible={visible}
      onCancel={handleCancelModal}
      footer={null}
      className="modal-item"
    >
      <Row className="modal-item__content">
        <Col xs={24} sm={24} md={0}>
          <HeaderItem owner={owner} />
        </Col>

        <Col xs={24} sm={16}>
          <ImageItem src={src} />
        </Col>
        <Col xs={24} sm={8}>
          <div className="modal-item__content--info">
            <Row>
              <Col xs={0} sm={0} md={24}>
                <HeaderItem owner={owner} />
              </Col>
            </Row>
            <InfoItem {...restProps} owner={owner} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalItem;
