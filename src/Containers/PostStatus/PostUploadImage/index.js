import React from "react";
import { CloudinaryContext } from "cloudinary-react";

import AddImage from "./AddImage";
import Thumbnails from "./Thumbnails";
import "./uploadImage.scss";

const PostUploadImage = ({
  sidecarChildren = [],
  handleAddImage = () => {},
  handleRemoveImage = () => {}
}) => {
  // const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const images = sidecarChildren;

  return (
    <div className="post-upload-image">
      <div className="upload-image__wrapper">
        <div className="upload-image__items">
          <CloudinaryContext cloudName="dnzsa2z7b" className="thumbnails">
            {images.length > 0 &&
              images.map((item, idx) => (
                <Thumbnails
                  public_id={item.public_id}
                  key={item.public_id || idx}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
          </CloudinaryContext>
          <AddImage images={images} handleAddImage={handleAddImage} />
        </div>
      </div>
    </div>
  );
};

export default PostUploadImage;
