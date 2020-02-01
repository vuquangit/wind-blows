import React from "react";
import { Image } from "cloudinary-react";
import classNames from "classnames";

const ItemImage = ({
  public_id = "",
  width = 0,
  height = 0,
  isModal = false,
  isSliderImage = false
}) => {
  const classPIImageModal = classNames("content__wrapper--image-normal", {
    "content__wrapper--image-modal": isModal && width < height
  });

  return <Image publicId={public_id} className={classPIImageModal} />;
};

export default ItemImage;
