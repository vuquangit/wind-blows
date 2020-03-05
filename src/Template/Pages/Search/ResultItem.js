import React from "react";
import { Link } from "react-router-dom";

import AvatarUser from "Components/AvatarUser";

const ResultItem = ({
  username = "",
  isVerified = false,
  profilePictureUrl = "",
  profilePicturePublicId = "",
  subTitle = " • Following",
  isTagPeople = false
}) => {
  const _renderItem = () => (
    <>
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
    </>
  );

  return (
    <>
      {isTagPeople ? (
        <div className="search-people__item">{_renderItem()}</div>
      ) : (
        <Link
          to={`/${username}/`}
          title={username}
          className="search-people__item"
        >
          {_renderItem()}
        </Link>
      )}
    </>
  );
};

export default ResultItem;
