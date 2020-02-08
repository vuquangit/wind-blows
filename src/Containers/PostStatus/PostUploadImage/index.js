import React from "react";

import AddImage from "./AddImage";
import Thumbnails from "./Thumbnails";
import "./uploadImage.scss";

const PostUploadImage = ({
  sidecarChildren = [],
  handleAddImage = () => {},
  handleRemoveImage = () => {}
}) => {
  const images = sidecarChildren;

  return (
    <div className="post-upload-image">
      <div className="upload-image__wrapper">
        <div className="upload-image__items">
          <div className="thumbnails">
            {images.length > 0 &&
              images.map((item, idx) => (
                <Thumbnails
                  public_id={item.public_id}
                  key={item.public_id || idx}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
          </div>
          <AddImage images={images} handleAddImage={handleAddImage} />
        </div>
      </div>
    </div>
  );
};

export default PostUploadImage;
