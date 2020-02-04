import React from "react";
import Slider from "react-slick";
import { isEmpty } from "lodash";
import { settings } from "./configSliderImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemImage from "./ItemImage";

const SliderImages = ({ sidecarChildren = [] }) => {
  return (
    !isEmpty(sidecarChildren) && (
      <div className="slider-images">
        <Slider {...settings}>
          {sidecarChildren.map((item, idx) => (
            <ItemImage
              key={item.public_id || idx}
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
