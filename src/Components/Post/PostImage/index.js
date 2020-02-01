import React, { useState } from "react";
import "./postImage.scss";
import classNames from "classnames";
import { CloudinaryContext, Image } from "cloudinary-react";
import SliderImages from "./SliderImage";
import ItemImage from "./ItemImage";

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
        <CloudinaryContext
          cloudName="dnzsa2z7b"
          className={classPIWrapper}
          onDoubleClick={!likedByViewer ? handleLikePost : () => {}}
        >
          {sidecarChildren.length === 1 ? (
            <ItemImage {...sidecarChildren[0]} isModal={isModal} />
          ) : (
            <SliderImages sidecarChildren={sidecarChildren} />
          )}
        </CloudinaryContext>
        <div className="image-heart">
          <span className="sprite-icon__core image-heart__icon" />
        </div>
      </div>
    </div>
  );
};

export default PostImage;
