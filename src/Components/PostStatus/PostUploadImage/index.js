import React, { useState } from "react";
import { CloudinaryContext } from "cloudinary-react";

import AddImage from "./AddImage";
import Thumbnails from "./Thumbnails";
import "./uploadImage.scss";

const PostUploadImage = () => {
  const [images, setImages] = useState([
    {
      public_id: "zjptxcj2ujuszfibw3tz",
      version: 1579877851,
      signature: "5c951e7511298645bf9c337272f82085a3f609c4",
      width: 1080,
      height: 720,
      format: "jpg",
      resource_type: "image",
      created_at: "2020-01-24T14:57:31Z",
      tags: [],
      bytes: 904901,
      type: "upload",
      etag: "eeadbc4b8f11b85093a42d4a4458d006",
      placeholder: false,
      url:
        "http://res.cloudinary.com/dnzsa2z7b/image/upload/v1579877851/zjptxcj2ujuszfibw3tz.jpg",
      secure_url:
        "https://res.cloudinary.com/dnzsa2z7b/image/upload/v1579877851/zjptxcj2ujuszfibw3tz.jpg"
    },
    {
      public_id: "xk9ve3nfmlb1qkr2d9yk",
      version: 1579879572,
      signature: "b0b9ddfc7db2fd362548977dd74ee823a19374bd",
      width: 1080,
      height: 1620,
      format: "jpg",
      resource_type: "image",
      created_at: "2020-01-24T15:26:12Z",
      tags: [],
      bytes: 2120139,
      type: "upload",
      etag: "a223e9d7581320d820272a47c90b6d04",
      placeholder: false,
      url:
        "http://res.cloudinary.com/dnzsa2z7b/image/upload/v1579879572/xk9ve3nfmlb1qkr2d9yk.jpg",
      secure_url:
        "https://res.cloudinary.com/dnzsa2z7b/image/upload/v1579879572/xk9ve3nfmlb1qkr2d9yk.jpg"
    },
    {
      public_id: "q9fjmttlpnyxxlvpbc9r",
      version: 1579879588,
      signature: "d4ae054315384f8ddfb8b41591d90f3db47b4d65",
      width: 1080,
      height: 720,
      format: "jpg",
      resource_type: "image",
      created_at: "2020-01-24T15:26:28Z",
      tags: [],
      bytes: 904901,
      type: "upload",
      etag: "eeadbc4b8f11b85093a42d4a4458d006",
      placeholder: false,
      url:
        "http://res.cloudinary.com/dnzsa2z7b/image/upload/v1579879588/q9fjmttlpnyxxlvpbc9r.jpg",
      secure_url:
        "https://res.cloudinary.com/dnzsa2z7b/image/upload/v1579879588/q9fjmttlpnyxxlvpbc9r.jpg"
    },
    {
      public_id: "pgum2agxdzxglrmwou6v",
      version: 1579961650,
      signature: "2ba632a7740b0dd7c801cc6557a1e738724e77f4",
      width: 1080,
      height: 1620,
      format: "jpg",
      resource_type: "image",
      created_at: "2020-01-25T14:14:10Z",
      tags: [],
      bytes: 1323511,
      type: "upload",
      etag: "eabea0e6835e077e5599faf54b2c759a",
      placeholder: false,
      url:
        "http://res.cloudinary.com/dnzsa2z7b/image/upload/v1579961650/pgum2agxdzxglrmwou6v.jpg",
      secure_url:
        "https://res.cloudinary.com/dnzsa2z7b/image/upload/v1579961650/pgum2agxdzxglrmwou6v.jpg"
    },
    {
      public_id: "x0gqsxldtedk8fhhmk4i",
      version: 1579961650,
      signature: "8788caeb0b5683d1a835edf3c85f92b082248cd9",
      width: 1080,
      height: 1620,
      format: "jpg",
      resource_type: "image",
      created_at: "2020-01-25T14:14:10Z",
      tags: [],
      bytes: 1343229,
      type: "upload",
      etag: "a995623f5b99d27fc01b4fe3dad8cb09",
      placeholder: false,
      url:
        "http://res.cloudinary.com/dnzsa2z7b/image/upload/v1579961650/x0gqsxldtedk8fhhmk4i.jpg",
      secure_url:
        "https://res.cloudinary.com/dnzsa2z7b/image/upload/v1579961650/x0gqsxldtedk8fhhmk4i.jpg"
    },
    {
      public_id: "fnbb5unt5rknvagz9cv4",
      version: 1579961649,
      signature: "d73d3947c22acafb74debf09858f2acf8c3e283d",
      width: 1080,
      height: 720,
      format: "jpg",
      resource_type: "image",
      created_at: "2020-01-25T14:14:09Z",
      tags: [],
      bytes: 582758,
      type: "upload",
      etag: "b0fcbfc889429bee13afca9f2a5f45cf",
      placeholder: false,
      url:
        "http://res.cloudinary.com/dnzsa2z7b/image/upload/v1579961649/fnbb5unt5rknvagz9cv4.jpg",
      secure_url:
        "https://res.cloudinary.com/dnzsa2z7b/image/upload/v1579961649/fnbb5unt5rknvagz9cv4.jpg"
    }
  ]);

  const handleAddImage = resImage => {
    setImages(prevState => [...prevState, ...resImage]);
  };

  const handleRemoveImage = publicIdRemove => {
    console.log(publicIdRemove);

    setImages(images.filter(item => item.public_id !== publicIdRemove));
  };

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  // console.log("Images: ", images.length, cloudName);

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
