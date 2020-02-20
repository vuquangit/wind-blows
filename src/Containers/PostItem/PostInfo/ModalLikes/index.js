import React from "react";
import Modal from "Components/Modal";

import RelationshipList from "Containers/RelationshipList";

const ModalLikes = ({
  visibleModal = false,
  handleCancelModal = () => {},
  endpoint = "",
  params = {}
}) => {
  const apiConfig = {
    method: "get",
    endpoint,
    params,
    headers: {
      "Content-Type": "application/json"
    }
  };

  return (
    <div>
      <Modal
        title={null}
        visible={visibleModal}
        onCancel={handleCancelModal}
        footer={null}
        closable
        centered
        destroyOnClose
      >
        <RelationshipList {...apiConfig} headerText="Likes" />
      </Modal>
    </div>
  );
};

export default ModalLikes;
