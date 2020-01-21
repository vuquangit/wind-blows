import React, { useState } from "react";
import { message } from "antd";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import cloudinary from "cloudinary/lib/cloudinary";
import AddImage from "./AddImage";
import "./uploadImage.scss";

const PostUploadImage = () => {
  const [images, setImages] = useState([]);

  const handleAddImage = resImage => {
    setImages(prevState => [...prevState, ...resImage]);
  };

  const handleRemoveImage = publicIdImage => {
    setImages(prevState =>
      images.filter(item => item.publicId !== publicIdImage)
    );
  };

  return (
    <div className="post-upload-image">
      <CloudinaryContext cloudName="demo">
        {!images.length &&
          images.map((item, idx) => (
            <Image publicId={item.publicId} key={item.publicId}>
              <Transformation width="200" crop="scale" angle="10" />
            </Image>
          ))}
      </CloudinaryContext>

      <AddImage images={images} handleAddImage={handleAddImage} />
    </div>
  );
};

export default PostUploadImage;
