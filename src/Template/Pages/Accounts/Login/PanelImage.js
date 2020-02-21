import React from "react";
// import { Image, Transformation } from "cloudinary-react";

const PanelImage = () => {
  const urlImage =
    "https://res.cloudinary.com/dnzsa2z7b/image/upload/c_scale,w_600/v1581835258/the-wind-blows/Project%20image/Signup_panel.jpg";

  return (
    <div className="login__panel-image">
      <div
        style={{ backgroundImage: `url(${urlImage})` }}
        className="login__panel-backgroundImage"
      />
      {/* <Image
        publicId="the-wind-blows/Project%20image/SignIn_Panel.jpg"
        className="login__panel-image--content"
      >
        <Transformation width="600" crop="fill" />
      </Image> */}
    </div>
  );
};

export default PanelImage;
