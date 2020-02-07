import React from "react";
import { isEmpty } from "lodash";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";

import { settings } from "./configSliderImage";
import ItemImage from "./ItemImage";

const SliderImages = ({ sidecarChildren = [], isModal = false }) => {
  const classSliderImages = classNames("slider-images", {
    "slider-images-modal": isModal
  });
  return (
    !isEmpty(sidecarChildren) && (
      <div className={classSliderImages}>
        <Slider {...settings}>
          {sidecarChildren.map((item, idx) => (
            <ItemImage
              key={item.public_id || idx}
              isModal={isModal}
              {...item}
              className="slider-image__items"
            />
          ))}
        </Slider>
      </div>
    )
  );
};

export default SliderImages;
