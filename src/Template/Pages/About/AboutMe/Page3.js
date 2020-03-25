import React, { useEffect } from "react";
import { Image } from "cloudinary-react";
import classNames from "classnames";

const imagePublicId = [
  "the-wind-blows/Project image/a4_btkui2.jpg",
  "the-wind-blows/Project image/A1_iv4lss.jpg",
  "the-wind-blows/Project image/a2_ellvwe.jpg",
  "the-wind-blows/Project image/a3_cqkafi.jpg"
];

const Page3 = ({
  isMinWidth768 = false,
  heightPage1 = 0,
  distanceFromTop = 0,
  handleSetDistanceSticky = () => {},
  calculatedHeight = 0,
  handleSetHeightSticky = () => {},
  indexOfImage = 0
}) => {
  useEffect(() => {
    handleSetDistanceSticky(Math.abs(distanceFromTop));
  }, [distanceFromTop, handleSetDistanceSticky]);

  useEffect(() => {
    handleSetHeightSticky(calculatedHeight);
  }, [calculatedHeight, handleSetHeightSticky]);

  const classPage3 = classNames("page-3", {
    "page-3-white":
      isMinWidth768 &&
      Math.abs(distanceFromTop) > heightPage1 - calculatedHeight
  });

  return (
    <div className={classPage3}>
      <div className="_8h2z">
        <div className="_8h2y">
          <Image publicId={imagePublicId[indexOfImage]} className="_8g17" />
        </div>
      </div>
    </div>
  );
};

export default Page3;
