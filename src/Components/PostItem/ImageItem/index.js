import React from "react";

function ImageItem({ src = "" }) {
  return (
    <div
      className="post-item__image"
      style={{ backgroundImage: `url(${src})` }}
    ></div>
  );
}

export default ImageItem;
