import React from "react";
import { Image, Transformation } from "cloudinary-react";
import classNames from "classnames";

const ItemImage = ({
  public_id = "",
  width = 0,
  height = 0,
  isModal = false
}) => {
  const classPIImageModal = classNames("content__wrapper--image-normal", {
    "content__wrapper--image-portrait": isModal && width < height
  });

  return (
    <Image publicId={public_id} className={classPIImageModal}>
      <Transformation width="600" crop="scale" />
    </Image>
  );
};

export default ItemImage;
