import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { isEqual, get } from "lodash";
import { withRouter } from "react-router-dom";

import ModalChangePhoto from "Containers/ProfilePhoto/ModalChangePhoto";
import AvatarUser from "Components/AvatarUser";

const AvatarProfile = ({ match }) => {
  const {
    profilePictureUrl = "",
    profilePicturePublicId = ""
  } = useSelector((state = {}) => get(state, "personalProfile.data.user", {}));
  const { username: viewerUsername = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );
  const isOwner = isEqual(viewerUsername, get(match, "params.username", ""));

  // modal change profile photo
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => setVisibleModal(true);
  const handleCancelModal = () => setVisibleModal(false);

  return (
    <div className="personal__profile--avatar">
      <div className="avatar-content">
        <AvatarUser
          profilePictureUrl={profilePictureUrl}
          profilePicturePublicId={profilePicturePublicId}
          size={150}
        />
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
