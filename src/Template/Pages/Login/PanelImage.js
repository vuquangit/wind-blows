import React from "react";

const PanelImage = () => {
  return (
    <div className="login__image">
      <div
        style={{
          backgroundImage: `URL(https://live.staticflickr.com/65535/49145558886_75d1fd0329_k.jpg)`
        }}
        className="login__image--content"
      />
    </div>
  );
};

export default PanelImage;
