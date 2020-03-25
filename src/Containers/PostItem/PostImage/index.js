import React from "react";
import classNames from "classnames";

import SliderImages from "./SliderImage";
import ItemImage from "./ItemImage";
import "./postImage.scss";

const PostImage = ({
  sidecarChildren = [],
  isModal = false,
  isHomePage = false,
  likedByViewer = false,
  handleLikePost = () => {}
}) => {
  // classNames
  const classPI = classNames(
    "PI__PI",
    { PI__maxHeight: isModal },
    { "homepage-image": isHomePage }
  );
  const classPIContent = classNames("PI__PI--content", {
    PI__maxHeight: isModal
  });
  const classPIWrapper = classNames(
    "content__wrapper",
    {
      PI__maxHeight: isModal
    },
    { "homepage-image__wrapper": isHomePage }
  );

  return (
    <div className={classPI}>
      <div className={classPIContent}>
        <div
          className={classPIWrapper}
          onDoubleClick={!likedByViewer ? handleLikePost : () => {}}
        >
          {sidecarChildren.length === 1 ? (
            <ItemImage {...sidecarChildren[0]} isModal={isModal} />
          ) : (
            <SliderImages sidecarChildren={sidecarChildren} isModal={isModal} />
          )}
        </div>
        <div className="image-heart">
          <span className="sprite-icon__core image-heart__icon" />
        </div>
      </div>
    </div>
  );
};

export default PostImage;
