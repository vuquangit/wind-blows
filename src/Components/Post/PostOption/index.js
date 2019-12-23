import React, { useState } from "react";
import { Button } from "antd";
import ModalOption from "./ModalOption";
import "./postOption.scss";

const PostOption = () => {
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
        <span
          className="btn-img"
          style={{
            backgroundImage: `URL(${window.location.origin}/sprite_glyphs.png)`
          }}
        />
      </Button>
      <ModalOption
        visibleModal={visibleModal}
        handleCancelModal={handleCancelModal}
      />
    </div>
  );
};

export default PostOption;
