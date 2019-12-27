import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./postHeader.scss";

const PostHeader = ({
  username = "",
  profilePictureUrl = "",
  isVerified = "",
  location = { name: "Ho Chi Minh City, Viet Nam" },
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
        <Link to={`/${username}/`}>
          <Avatar src={profilePictureUrl} />
        </Link>
      </div>
      <div className="PI__PH--owner">
        <div className="owner">
          <div className="owner__info">
            <h2 className="owner__info--username">
              <Link to={`/${username}/`} title={username}>
                {username}
              </Link>
            </h2>
            {isVerified && (
              <span
                className=" sprite-icon__core verified__small"
                title="Verified"
              >
                Verified
              </span>
            )}
          </div>
          {!isHomePage && !isMyPost && (
            <div className="owner__follow">
              <span className="owner__follow--dot">•</span>
              <button className={followClass}>
                {isFollowed ? `Following` : `Follow`}
              </button>
            </div>
          )}
        </div>
        {location && location.name && (
          <div className="location">{location.name} </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
