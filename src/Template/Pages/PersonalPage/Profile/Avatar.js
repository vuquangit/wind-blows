import React from "react";
import { useSelector } from "react-redux";

const Avatar = () => {
  const { profilePictureUrl = "" } = useSelector(
    (state = {}) => state.personalProfile.data.user
  );

  return (
    <div className="personal__header--avatar">
      <div className="avatar-layer1">
        <div className="avatar-layer2">
          <button className="avatar-button" title="Change Profile Photo">
            {/* eslint-disable-next-line */}
            <img
              className="avatar-image"
              src={profilePictureUrl}
              alt="Change Profile Photo"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
