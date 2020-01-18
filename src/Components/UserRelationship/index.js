import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import "./userRelationship.scss";
import { withRouter } from "react-router";
import FollowStatus from "Components/FollowStatus";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

const UserRelationship = ({ user = {}, relationship = {}, match }) => {
  const {
    id = "",
    profilePictureUrl = "",
    username = "",
    suggestionDescription = "",
    fullName = ""
  } = user;
  const { id: viewerId = "" } = useSelector(
    (state = {}) => state.profile.data.user
  );

  const subDescription = match.path === "/" ? suggestionDescription : fullName;
  const isMe = isEqual(id, viewerId);

  return (
    <div className="SGI">
      <div className="SGI__avatar">
        <Link to={`/${username || id}/`} title={username || id}>
          <Avatar src={profilePictureUrl} />
        </Link>
      </div>
      <div className="SGI__info">
        <div className="SGI__info--username">
          <Link to={`/${username || id}/`} title={username || id}>
            {username || id}
          </Link>
        </div>
        <div className="SGI__info--description">
          <div className="DCR">{subDescription}</div>
        </div>
      </div>
      <div className="SGI__follow">
        {!isMe && (
          <FollowStatus
            user={user}
            viewerId={viewerId}
            relationship={relationship}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(UserRelationship);
