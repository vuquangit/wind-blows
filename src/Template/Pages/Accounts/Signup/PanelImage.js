import React from "react";
import { Image, Transformation } from "cloudinary-react";

const PanelImage = () => {
  return (
    <div className="email-signup__panel-image">
      <Image
        publicId="the-wind-blows/Project image/_DSC8799_lbelbp"
        className="email-signup__panel-image--content"
      >
        <Transformation width="600" crop="fill" />
      </Image>
    </div>
  );
};

export default PanelImage;
