import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { get, isEqual } from "lodash";
import { useSelector } from "react-redux";

import FollowStatus from "Components/FollowStatus";
import "./postHeader.scss";

const PostHeader = ({
  owner = {},
  relationship = {},
  location = { name: "" },
  isHomePage = false
}) => {
  const {
    id: ownerId = "",
    username = "",
    profilePictureUrl = "",
    isVerified = ""
  } = owner;

  // Compare owner post and user login profile
  const { id: viewerId = "" } = useSelector(state =>
    get(state, "profile.data.user")
  );
  const isMyPost = isEqual(viewerId, ownerId);

  // class style
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
              <FollowStatus
                user={owner}
                viewerId={viewerId}
                relationship={relationship}
              />
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
