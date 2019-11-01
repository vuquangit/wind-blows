import React from "react";
import "./postItem.scss";

function PostItem({
  thumbnailSrc = "",
  numLikes = 0,
  numComments = 0,
  ...restProps
}) {
  return (
    <div className="post-item">
      <div>
        <div>
          <img alt="alt image" src={thumbnailSrc} />
        </div>
      </div>
      <div>
        <span aria-label="Carousel" className="filled" />
      </div>
      <div className="post-item__LC">
        <div className="post-item__LC--content">
          <div>{numLikes}</div>
          <div>{numComments}</div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
