import React from "react";

function ImageItem({ src = "" }) {
  return (
    <div>
      <img
        className="modal-item__image"
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default ImageItem;
