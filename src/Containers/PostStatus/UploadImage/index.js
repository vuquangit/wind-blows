import React from "react";

import AddImage from "./AddImage";
import Thumbnails from "./Thumbnails";
import "./uploadImage.scss";

const PostUploadImage = ({
  sidecarChildren = [],
  handleAddDataImages = () => {},
  handleUpdateImages = () => {},
  handleRemoveImage = () => {}
}) => {
  return (
    <div className="post-upload-image">
      <div className="upload-image__wrapper">
        <div className="upload-image__items">
          <div className="thumbnails">
            {sidecarChildren.length > 0 &&
              sidecarChildren.map((item, idx) => (
                <Thumbnails
                  key={idx}
                  {...item}
                  handleUpdateImages={handleUpdateImages}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
          </div>
          {sidecarChildren.length < 9 && (
            <AddImage
              totalFilesSelected={sidecarChildren.length}
              handleAddDataImages={handleAddDataImages}
              handleUpdateImages={handleUpdateImages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostUploadImage;
