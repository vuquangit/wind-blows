import React from "react";
import "./postImage.scss";
import classNames from "classnames";

const PostImage = ({
  src = "",
  isModal = false,
  isHomePage = false,
  likedByViewer = false,
  handleLikePost = () => {}
}) => {
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
    "content__wrapper--image-modal": isModal
  });

  return (
    <div className={classPI}>
      <div className={classPIContent}>
        <div className={classPIWrapper}>
          <img
            alt="..."
            src={src}
            className={classPIImageModal}
            onDoubleClick={!likedByViewer ? handleLikePost : () => {}}
          />
        </div>
        <div className="image-heart">
          <span className="sprite-icon__core image-heart__icon" />
        </div>
      </div>
    </div>
  );
};

export default PostImage;
