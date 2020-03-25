import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AvatarUser from "Components/AvatarUser";

const Profile = () => {
  const {
    username = "",
    isVerified = false,
    profilePictureUrl = "",
    profilePicturePublicId = "",
    fullName = ""
  } = useSelector((state = {}) => state.profile.data.user);

  return (
    <div className="profile">
      <div className="profile__content">
        <Link to={`/${username}/`}>
          <AvatarUser
            profilePicturePublicId={profilePicturePublicId}
            profilePictureUrl={profilePictureUrl}
            size={50}
          />
        </Link>
        <div className="profile__content--info">
          <div className="info__username">
            <Link to={`/${username}/`}>{username}</Link>
            {isVerified && (
              <span
                className=" sprite-icon__core verified__small"
                title="Verified"
              >
                Verified
              </span>
            )}
          </div>
          <div className="info__name">{fullName}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
