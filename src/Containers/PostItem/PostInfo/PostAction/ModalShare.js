import React from "react";
import { Modal } from "antd";
import {
  faFacebookSquare,
  faFacebookMessenger,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ShareButtonWrapper from "./ShareButtonWrapper";

const ModalShare = ({ visibleModal, handleCancelModal }) => {
  return (
    <Modal
      title="Share"
      visible={visibleModal}
      onCancel={handleCancelModal}
      className="action__share-modal"
      footer={null}
      closable
      centered
    >
      <div className="action__share-modal--content">
        <ShareButtonWrapper icon={faFacebookSquare}>
          Share to Facebook
        </ShareButtonWrapper>
        <ShareButtonWrapper icon={faFacebookMessenger}>
          Share to Messenger
        </ShareButtonWrapper>
        <ShareButtonWrapper icon={faTwitter}>
          Share to Twitter
        </ShareButtonWrapper>
        <ShareButtonWrapper icon={faEnvelope}>
          Share to Email
        </ShareButtonWrapper>
        <ShareButtonWrapper icon={faLink}>Copy Link</ShareButtonWrapper>
        <ShareButtonWrapper onClick={handleCancelModal}>
          Cancel
        </ShareButtonWrapper>
      </div>
    </Modal>
  );
};

export default ModalShare;
