import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

const AvatarProfile = () => {
  const { profilePictureUrl = "" } = useSelector(
    (state = {}) => state.personalProfile.data.user
  );

  return (
    <div className="personal__header--avatar">
      <div className="avatar-layer1">
        <div className="avatar-layer2">
          <button className="avatar-button" title="Change Profile Photo">
            {profilePictureUrl ? (
              <Avatar src={profilePictureUrl} size={150} />
            ) : (
              <Avatar icon="user" size={150} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarProfile;
