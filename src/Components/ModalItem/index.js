import React from "react";

const ModalItem = ({ src = "" }) => {
  return (
    <div>
      <img
        className="modal-item__image"
        src={src}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ModalItem;
