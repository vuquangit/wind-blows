import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";

const PostHeader = ({
  username = "",
  profilePictureUrl = "",
  isVerified = "",
  location = "Ho Chi Minh City, Viet Nam",
  isHomePage = false
}) => {
  // Compare owner post and user login profile
  const isMyPost = false;

  // Check is followed ?
  const isFollowed = false;

  const followClass = classNames("owner__follow--button", {
    follow: !isFollowed
  });

  const headerClass = classNames("PI__PH", { "PI__PH--homepage": isHomePage });

  return (
    <header className={headerClass}>
      <div className="PI__PH--avatar">
        <Avatar src={profilePictureUrl} />
      </div>
      <div className="PI__PH--owner">
        <div className="owner">
          <div className="owner__info">
            <h2 className="owner__info--username">
              <Link to={username} title={username}>
                {username}
              </Link>
            </h2>
            {isVerified && (
              <span className="owner__info--verified" title="Verified">
                Verified
              </span>
            )}
          </div>
          {!isMyPost && (
            <div className="owner__follow">
              <span className="owner__follow--dot">•</span>
              <button className={followClass}>
                {isFollowed ? `Following` : `Follow`}
              </button>
            </div>
          )}
        </div>
        {location && <div className="location">{location} </div>}
      </div>
    </header>
  );
};

export default PostHeader;
