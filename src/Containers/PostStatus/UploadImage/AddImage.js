import React, { useState } from "react";
import { message } from "antd";
import IsLoading from "Components/IsLoading";

import { toBase64 } from "utils/toBase64";

const AddImage = ({ handleAddDataImages = () => {} }) => {
  const fetchUploadImage = async e => {
    e.preventDefault();

    const filesSeleted = Array.from(e.target.files);
    if (filesSeleted.length > 9) {
      message.warning({
        content: "You can only upload a maximum of 9 files",
        duration: 5
      });
      e.preventDefault();
      return; // exit upload
    }

    filesSeleted.map(async file => {
      const { data, type } = await toBase64(file);
      const image = {
        name: file.name,
        type: type,
        base64: data
      };

      console.log(image);
      handleAddDataImages(image);
    });
  };

  return (
    <div className="add-image">
      <span className="_kkr">
        <div className="_m _6a">
          <div className="__9u __9t" rel="ignore">
            <div className="_3jk">
              <input
                accept="image/*, image/heic, image/heif"
                multiple
                name="composer_photo"
                title="Select images to upload"
                data-testid="add-more-photos"
                display="inline-block"
                type="file"
                className="_n _5f0v"
                id="js_e9p"
                onChange={fetchUploadImage}
              />
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default AddImage;
