import React, { useState } from "react";
import Axios from "axios";
import { message } from "antd";
import IsLoading from "Components/IsLoading";

const toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Landscape: 1080x608
        // Square: 1080x1080
        // Portait: 1080x1350
        const width = 1080;
        const elem = document.createElement("canvas");
        const scaleFactor = width / img.width;
        elem.width = width;
        elem.height = img.height * scaleFactor;

        const ctx = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        const type = "image/jpeg";

        resolve({ data: ctx.canvas.toDataURL(type, 1), type });
      };
    };

    reader.onerror = error => {
      reject(error);
    };
  });
};

const AddImage = ({ handleAddImage = () => {} }) => {
  const [uploading, setUploading] = useState(false);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const fetchUploadImage = async e => {
    e.preventDefault();
    setUploading(true);

    const filesSeleted = Array.from(e.target.files);
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
        const res = await Axios.post(`${SERVER_BASE_URL}/upload-image/upload`, {
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
      {uploading && (
        <div className="add-image__is-loading">
          <IsLoading isLoading={uploading} size={32} />
        </div>
      )}
      {/* ) : ( */}
      <>
        <span className="_kkr">
          <div className="_m _6a">
            <a className="__9u __9t" rel="ignore">
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
            </a>
          </div>
        </span>
      </>
      {/* )} */}
    </div>
  );
};

export default AddImage;
