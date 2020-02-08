import React, { useState } from "react";
import { Image, Transformation } from "cloudinary-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, message } from "antd";
import axios from "axios";

const Thumbnails = ({ public_id, handleRemoveImage = () => {} }) => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const handleShowModalEdit = () => setVisibleModalEdit(true);
  const handleCancelModalEdit = () => setVisibleModalEdit(false);

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  const fecthDeleteImage = async publicId => {
    try {
      await axios({
        method: "POST",
        url: `${SERVER_BASE_URL}/upload-image/delete`,
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

  return (
    <div key={public_id} className="thumbnails__item">
      <Image publicId={public_id} className="thumbnails__item--image">
        <Transformation height="100" width="100" crop="fill" />
      </Image>
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
    </div>
  );
};

export default Thumbnails;
