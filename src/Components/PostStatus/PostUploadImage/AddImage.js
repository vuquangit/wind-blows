import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import IsLoading from "Components/IsLoading";
// import sharp from "sharp";

const AddImage = ({ handleAddImage = () => {} }) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

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

  const handleInputOnchange = async e => {
    e.preventDefault();
    setUploading(true);

    const filesSeleted = Array.from(e.target.files);

    const getDataImages = filesSeleted.map(async (file, i) => {
      const { data, type } = await toBase64(file);
      return {
        name: file.name,
        type: type,
        base64: data
      };
    });

    Promise.all(getDataImages).then(async data => {
      console.log("data", data);

      try {
        const res = await Axios.post(`${SERVER_BASE_URL}/image-upload`, {
          data: data,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        handleAddImage(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      } finally {
        setUploading(false);
      }
    });
  };

  return (
    <div>
      {uploading ? (
        <IsLoading isLoading={uploading} />
      ) : (
        <>
          <input type="file" onChange={handleInputOnchange} multiple />

          <div>
            <FontAwesomeIcon icon={faPlus} color="#3B5998" size="5x" />
            <p>Add image</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AddImage;
