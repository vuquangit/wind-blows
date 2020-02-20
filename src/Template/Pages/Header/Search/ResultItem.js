import React from "react";
import { Link } from "react-router-dom";

import AvatarUser from "Components/AvatarUser";

const ResultItem = ({
  username = "",
  isVerified = false,
  profilePictureUrl = "",
  profilePicturePublicId = "",
  subTitle = " • Following"
}) => {
  return (
    <Link
      to={`/${username}/`}
      title={username}
      className="header__search--item"
    >
      <div className="result__avatar">
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={44}
        />
      </div>
      <div className="result__description">
        <div className="result__description--username">
          {username}
          {isVerified && (
            <span
              className=" sprite-icon__core verified__small"
              title="Verified"
            >
              Verified
            </span>
          )}
        </div>
        <div className="result__description--fullName">{subTitle}</div>
      </div>
    </Link>
  );
};

export default ResultItem;
