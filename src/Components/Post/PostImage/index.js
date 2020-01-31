import React, { useState } from "react";
import "./postImage.scss";
import classNames from "classnames";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import IsLoading from "Components/IsLoading";

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
  const classPIImageModal = classNames("content__wrapper--image-normal", {
    "content__wrapper--image-modal":
      isModal && sidecarChildren[0].width < sidecarChildren[0].height
  });

  return (
    <div className={classPI}>
      <div className={classPIContent}>
        <CloudinaryContext cloudName="dnzsa2z7b" className={classPIWrapper}>
          <Image
            publicId={sidecarChildren[0].public_id}
            className={classPIImageModal}
            onDoubleClick={!likedByViewer ? handleLikePost : () => {}}
          />
        </CloudinaryContext>
        <div className="image-heart">
          <span className="sprite-icon__core image-heart__icon" />
        </div>
      </div>
    </div>
  );
};

export default PostImage;
