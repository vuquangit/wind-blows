import React, { useState } from "react";
import axios from "utils/axiosConfig";
import { message } from "antd";
import IsLoading from "Components/IsLoading";

import { toBase64 } from "utils/toBase64";

const AddImage = ({ handleAddImage = () => {} }) => {
  const [uploading, setUploading] = useState(false);

  const fetchUploadImage = async e => {
    e.preventDefault();
    setUploading(true);

    const filesSeleted = Array.from(e.target.files);
    if (filesSeleted.length > 9) {
      message.warning({
        content: "You can only upload a maximum of 9 files",
        duration: 5
      });
      e.preventDefault();
      setUploading(false);
      return; // exit upload
    }

    const getDataImages = filesSeleted.map(async file => {
      const { data, type } = await toBase64(file);
      return {
        name: file.name,
        type: type,
        base64: data
      };
    });

    Promise.all(getDataImages).then(async data => {
      try {
        const res = await axios.post("/upload-image/upload", {
          data: data,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        handleAddImage(res.data);
        // console.log(res);
      } catch (err) {
        message.error("Error: ", err);
        console.log(err);
      } finally {
        setUploading(false);
      }
    });
  };

  return (
    <div className="add-image">
      {uploading ? (
        <div className="add-image__is-loading">
          <IsLoading isLoading={uploading} size={32} />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AddImage;
