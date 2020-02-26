import React from "react";
import AvatarUser from "Components/AvatarUser";
import { Link } from "react-router-dom";
import { Button } from "antd";

const FollowRequestItem = ({
  username = "",
  fullName = "",
  isVerified = false,
  profilePictureUrl = "",
  profilePicturePublicId = ""
}) => {
  return (
    <div>
      <Link to={`/${username}/`} title={username}>
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={32}
        />
      </Link>

      <div>
        <Link to={`/${username}/`} title={username} className="username">
          {username}
        </Link>
        <span>{fullName}</span>
      </div>
      <div>
        <Button>Confirm</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default FollowRequestItem;
