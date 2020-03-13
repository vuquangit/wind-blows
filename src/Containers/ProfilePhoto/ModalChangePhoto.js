import React, { useState, useCallback } from "react";
import { Modal, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "utils/axiosConfig";
import { get, isEqual } from "lodash";

import { updateUserProfile } from "Redux/Profile/profile.action";
import { updateUserProfile as updateUserPersonalProfile } from "Redux/PersonalProfile/personalProfile.action";
import Pinwheel from "Components/Loaders/Pinwheel";
import { toBase64 } from "utils/toBase64";

const ModalChangePhoto = ({ visibleModal, handleCancelModal }) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const {
    id: userId = "",
    profilePictureUrl: profilePictureUrlBefore = ""
  } = useSelector(
    (state = {}) => get(state, "profile.data.user", {}),
    isEqual()
  );

  const personalId = useSelector((state = {}) =>
    get(state, "personalProfile.data.user.id", "")
  );

  const fetchChangePhoto = useCallback(
    async ({ profilePictureUrl = "", publicId = "" }) => {
      setUpdating(true);

      try {
        // change profile photo
        await axios({
          method: "post",
          url: "/users/change-profile-photo",
          data: {
            userId,
            profilePictureUrl,
            profilePicturePublicId: publicId
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        // delete old profile photo in cloudinary
        if (profilePictureUrlBefore && profilePictureUrlBefore.length > 2) {
          const publicId = profilePictureUrlBefore.substring(
            profilePictureUrlBefore.lastIndexOf("/") + 1,
            profilePictureUrlBefore.lastIndexOf(".")
          );
          try {
            await axios({
              method: "POST",
              url: "/images/delete",
              data: {
                publicId
              },
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            });
            // message.success({ content: "Deleted old profile photo", keyMessage });
          } catch (err) {}
        }

        message.success({
          content: "Updated your profile photo",
          keyMessage,
          duration: 3
        });

        // reload profile
        const data = { profilePictureUrl, profilePicturePublicId: publicId };
        await dispatch(updateUserProfile(data));
        if (isEqual(userId, personalId))
          await dispatch(updateUserPersonalProfile(data));

        handleCancelModal(true);
      } catch (err) {
        setUpdating(false);
        message.error({ content: `Error: ${err}`, key: keyMessage });
        console.log(err);
      }
    },
    [dispatch, handleCancelModal, profilePictureUrlBefore, userId, personalId]
  );

  // upload image
  const keyMessage = "updatable";
  const handleUploadPhoto = useCallback(
    async event => {
      message.loading({ content: "Please wait...", key: keyMessage });

      const filesSeleted = Array.from(event.target.files);
      if (filesSeleted.length === 0) {
        message.error("No image selected");
        return;
      }

      const { base64 = "" } = await toBase64(filesSeleted[0]);
      setUpdating(true);
      const source = axios.CancelToken.source();

      // upload image
      try {
        const res = await axios.post("/images/upload", {
          data: base64,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          cancelToken: source.token
        });

        console.log(res);

        const dataProfile = {
          profilePictureUrl: get(res, "data.url", ""),
          publicId: get(res, "data.public_id", "")
        };
        await fetchChangePhoto(dataProfile);

        // setUpdating(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("cancelled uploading photo");
        } else {
          // setUpdating(false);
          message.error({ content: `Error: ${err}`, key: keyMessage });
          console.log(err);
        }
      } finally {
        setUpdating(false);
      }
    },
    [fetchChangePhoto]
  );

  const handleSelectPhoto = () => {
    document.getElementById("selectImage").click();
  };

  const handleRemoveImage = () => {
    message.loading({ content: "Please wait...", key: keyMessage });
    const data = {
      profilePictureUrl: null,
      publicId: null
    };
    fetchChangePhoto(data);
  };

  return (
    <Modal
      title="Change Profile Photo"
      visible={visibleModal}
      onCancel={!updating ? handleCancelModal : () => {}}
      className="profile-photo__modal"
      footer={null}
      closable={false}
      centered
    >
      {updating && (
        <div className="profile-photo__modal--loading">
          <div className="loading-content">
            <Pinwheel isLoading size={64} />
          </div>
        </div>
      )}
      <div className="profile-photo__modal--content">
        <Button
          className="modal-btn btn-upload"
          onClick={() => handleSelectPhoto()}
        >
          Upload Photo
        </Button>
        <Button
          className="modal-btn btn-remove"
          onClick={() => handleRemoveImage()}
        >
          Remove Current Photo
        </Button>
        <Button className="modal-btn btn-cancel" onClick={handleCancelModal}>
          Cancel
        </Button>
        <input
          id="selectImage"
          accept="image/jpeg,image/png"
          type="file"
          className="input-upload-image"
          onChange={e => handleUploadPhoto(e)}
        />
      </div>
    </Modal>
  );
};

export default ModalChangePhoto;
