import React from "react";

function ImageItem({ src = "" }) {
  return (
    <div
      className="modal-item__image"
      style={{ backgroundImage: `url(${src})` }}
    ></div>
  );
}

export default ImageItem;
