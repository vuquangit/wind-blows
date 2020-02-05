import React, { useState } from "react";
import { Button } from "antd";
import ModalOption from "./ModalOption";
import "./postOption.scss";

const PostOption = ({ postId }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = e => {
    setVisibleModal(false);
  };

  return (
    <div className="PI__PO">
      <Button className="PI__PO--btn" onClick={showModal}>
        <span className="sprite-icon__glyphs btn-img" />
      </Button>
      <ModalOption
        visibleModal={visibleModal}
        handleCancelModal={handleCancelModal}
        postId={postId}
      />
    </div>
  );
};

export default PostOption;
