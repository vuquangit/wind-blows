import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, message } from "antd";
import axios from "utils/axiosConfig";

const Thumbnails = ({
  handleRemoveImage = () => {},
  handleUpdateImages = () => {},
  base64 = "",
  name = "",
  idImageSelect = "",
  isUploaded = false,
  isUploadError = false,
  ...props
}) => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const handleShowModalEdit = () => setVisibleModalEdit(true);
  const handleCancelModalEdit = () => setVisibleModalEdit(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUploadImage = async data => {
      try {
        const res = await axios.post("/upload-image/upload", {
          data: data, //can upload mutile image
          headers: {
            "Content-Type": "multipart/form-data"
          },
          cancelToken: source.token
        });

        handleUpdateImages({
          ...res.data,
          isUploaded: true,
          idImageSelect: idImageSelect
        });
        console.log("res upload:", res);
      } catch (err) {
        message.error("Error: ", err);
        console.log(err);
        handleUpdateImages({
          isUploadError: err,
          idImageSelect: idImageSelect
        });
      }
    };

    if (base64) {
      // fetchUploadImage([data.base64]);
      console.log("uploading data", name);
    }

    // unmount
    return async () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fecthDeleteImage = async publicId => {
    try {
      await axios({
        method: "POST",
        url: "/upload-image/delete",
        data: {
          publicId
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
    } catch (err) {
      message.error("Error: ", err);
      console.log(err);
    } finally {
      handleRemoveImage(publicId);
    }
  };

  console.log("props", props);

  const public_id = base64;

  return (
    <div className="thumbnails__item">
      <div
        style={{ backgroundImage: `url(${base64})` }}
        className="thumbnails__item--image"
      />

      {isUploadError && isUploaded && (
        <>
          <button
            className="thumbnails__item--btn-remove"
            title="Remove this image"
            onClick={() => fecthDeleteImage(public_id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="thumbnails__item--option">
            <button
              className="thumbnails__item--btn-edit-photo"
              title="Edit photo"
              onClick={handleShowModalEdit}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <Modal
              title={null}
              visible={visibleModalEdit}
              onCancel={handleCancelModalEdit}
              className="thumbnails__item--modal"
              // footer={null}
              // closable={false}
              centered
            >
              <div>
                <Image
                  publicId={public_id}
                  style={{ height: "calc( 100vh - 120px)" }}
                />
              </div>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Thumbnails;
