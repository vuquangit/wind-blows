import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faEdit,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import { message, Button } from "antd";
import { isEmpty } from "lodash";

import axios from "utils/axiosConfig";
import { stopPropagation } from "utils/stopPropagation";
import Pinwheel from "Components/Loaders/Pinwheel";
import Spinner from "Components/Loaders/Spinner";
import Modal from "Components/Modal";

const Thumbnails = ({
  handleRemoveImage = () => {},
  handleUpdateImages = () => {},
  public_id = "",
  uuidFile = "",
  base64 = "",
  isConverted = false,
  isUploaded = false,
  isUploadError = false
}) => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const handleShowModalEdit = () => setVisibleModalEdit(true);
  const handleCancelModalEdit = () => setVisibleModalEdit(false);

  // upload
  const source = axios.CancelToken.source();
  const fetchUploadImage = async data => {
    if (!data) {
      console.log("No data to upload image");
      return;
    }

    try {
      handleUpdateImages({
        isUploadError: false,
        isUploaded: false,
        uuidFile: uuidFile
      });

      const res = await axios.post("/images/upload", {
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        cancelToken: source.token
      });

      // console.log("res upload:", res);

      if (!isEmpty(res.data))
        handleUpdateImages({
          ...res.data,
          isUploaded: true,
          uuidFile: uuidFile
        });
    } catch (err) {
      if (axios.isCancel(err)) {
        // console.log("cancelled uploading photo");
      } else {
        message.error("Have a photo upload failed", 3);
        console.log(err);
        handleUpdateImages({
          isUploadError: err,
          uuidFile: uuidFile
        });
      }
    }
  };

  useEffect(() => {
    if (base64 && !public_id && !isUploadError) {
      fetchUploadImage(base64);
    }

    // unmount
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64]);

  const fecthDeleteImage = async e => {
    stopPropagation(e);

    if (public_id) {
      try {
        await axios({
          method: "POST",
          url: "/images/delete",
          data: {
            publicId: public_id
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        });
      } catch (err) {
        message.error("Error: " + err, 3);
        console.log(err);
      }
    }

    handleRemoveImage(uuidFile);
  };

  return (
    <div className="thumbnails__item">
      {!isConverted ? (
        <div className="thumbnails__item--center">
          <Pinwheel isLoading size={32} />
        </div>
      ) : base64 ? (
        <>
          <div
            style={{ backgroundImage: `url(${base64})` }}
            className="thumbnails__item--image"
          />
          {!isUploadError ? (
            <>
              {isUploaded ? (
                <div className="thumbnails__item--option">
                  <Button
                    className="thumbnails__item--btn-remove"
                    title="Remove this image"
                    onClick={() => fecthDeleteImage()}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                  <Button
                    className="thumbnails__item--btn-edit-photo"
                    title="Edit photo"
                    onClick={handleShowModalEdit}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Modal
                    title={null}
                    visible={visibleModalEdit}
                    onOk={handleCancelModalEdit}
                    onCancel={handleCancelModalEdit}
                    className="thumbnails__item--modal"
                    // footer={null}
                    closable={false}
                    centered
                  >
                    <div
                      style={{
                        backgroundImage: `url(${base64})`
                      }}
                      className="modal-content"
                    />
                  </Modal>
                </div>
              ) : (
                <div className="thumbnails__item--info">
                  <Spinner size={44} color="#fff" />
                </div>
              )}
            </>
          ) : (
            <div className="thumbnails__item--info">
              <Button
                className="thumbnails__item--btn-remove item-error-remove"
                title="Remove this image"
                onClick={fecthDeleteImage}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button
                onClick={() => fetchUploadImage(base64)}
                className="item-btn-retry"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  style={{ fontSize: "32px", color: "yellow" }}
                />
                <p style={{ color: "#fff", margin: "0" }}>Retry</p>
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="thumbnails__item--center">Empty</div>
      )}
    </div>
  );
};

export default Thumbnails;
