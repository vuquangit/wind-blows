import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { isEqual, get } from "lodash";

import ModalChangePhoto from "Components/ProfilePhoto/ModalChangePhoto";
import { withRouter } from "react-router-dom";

const AvatarProfile = ({ match }) => {
  const { profilePictureUrl = "",  } = useSelector(
    (state = {}) => state.personalProfile.data.user
  );

  const { usernameViewer = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );
  const isOwner = isEqual(usernameViewer, get(match, "params.username"));

  // modal change profile photo
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = () => {
    setVisibleModal(false);
  };

  return (
    <div className="personal__header--avatar">
      <div className="avatar-content">
        {profilePictureUrl ? (
          <Avatar src={profilePictureUrl} size={150} />
        ) : (
          <Avatar icon="user" size={150} />
        )}
        {isOwner && (
          <div className="change-photo">
            <button onClick={showModal} className="change-photo__btn-change">
              <FontAwesomeIcon icon={faCamera} style={{ fontSize: "24px" }} />
            </button>
            <ModalChangePhoto
              visibleModal={visibleModal}
              handleCancelModal={handleCancelModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(AvatarProfile);
