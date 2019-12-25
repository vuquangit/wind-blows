import React from "react";
import { Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import "./userRelationship.scss";
import { withRouter } from "react-router";
import classNames from "classnames";

const UserRelationship = ({ user = {}, relationship = {}, match }) => {
  const {
    profilePictureUrl = "",
    username = "",
    suggestionDescription = "",
    fullName = ""
  } = user;

  const subDescription = match.path === "/" ? suggestionDescription : fullName;

  const followStatus =
    relationship.followedByViewer.state === "FOLLOW_STATUS_FOLLOWING"
      ? "Following"
      : "Follow";

  const followStatusClass = classNames(
    "SGI__follow--btn-normal",
    {
      "SGI__follow--btn-homepage": match.path === "/"
    },
    {
      "SGI__follow--btn-follow":
        match.path !== "/" &&
        relationship.followedByViewer.state !== "FOLLOW_STATUS_FOLLOWING"
    }
  );

  return (
    <div className="SGI">
      <div className="SGI__avatar">
        <Avatar src={profilePictureUrl} />
      </div>
      <div className="SGI__info">
        <div className="SGI__info--username">
          <Link to={`/${username}/`} title={username}>
            {username}
          </Link>
        </div>
        <div className="SGI__info--description">
          <div className="DCR">{subDescription}</div>
        </div>
      </div>
      <div className="SGI__follow">
        <Button className={followStatusClass}>{followStatus}</Button>
      </div>
    </div>
  );
};

export default withRouter(UserRelationship);
