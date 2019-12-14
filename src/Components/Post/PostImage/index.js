import React from "react";

const PostImage = ({ src = "" }) => {
  return (
    <div className="PI__PI">
      <div className="PI__PI--content">
        <div className="wrapper-image">
          <img alt="..." src={src} className="L1__image" />
        </div>
      </div>
    </div>
  );
};

export default PostImage;
