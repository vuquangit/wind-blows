import React from "react";
import AvatarUser from "Components/AvatarUser";
import { Link } from "react-router-dom";

const AvatarUR = ({ user = {} }) => {
  const {
    profilePictureUrl = "",
    profilePicturePublicId = "",
    username = ""
  } = user;

  return (
    <div className="SGI__avatar">
      <Link to={`/${username}/`} title={username}>
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={32}
        />
      </Link>
    </div>
  );
};

export default AvatarUR;
