import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const Owner = ({
  username = "",
  fullName = "",
  isVerified = false,
  profilePictureUrl = ""
} = {}) => {
  return (
    <div>
      <Link to={username} className="owner">
        <Avatar src={profilePictureUrl} alt={fullName} size={32} />
        <h2 className="username">{username}</h2>
      </Link>
      {isVerified && (
        <span className="verified" title="Verified">
          Verified
        </span>
      )}
    </div>
  );
};

export default Owner;
