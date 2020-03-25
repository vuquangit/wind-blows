import React from "react";
import { Link } from "react-router-dom";

import AvatarUser from "Components/AvatarUser";
import { stopPropagation } from "utils/stopPropagation";

const AvatarUR = ({ user = {}, size = 32 }) => {
  const {
    profilePictureUrl = "",
    profilePicturePublicId = "",
    username = ""
  } = user;

  const handleStopPropagation = e => {
    stopPropagation(e);
  };

  return (
    <div className="SGI__avatar">
      <Link
        to={`/${username}/`}
        title={username}
        onClick={handleStopPropagation}
      >
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={size}
        />
      </Link>
    </div>
  );
};

export default AvatarUR;
