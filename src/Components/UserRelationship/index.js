import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import FollowStatus from "Containers/FollowStatus";
import AvatarUser from "Components/AvatarUser";
import "./userRelationship.scss";

const UserRelationship = ({ user = {}, relationship = {}, match }) => {
  const {
    id = "",
    profilePictureUrl = "",
    profilePicturePublicId = "",
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
          <AvatarUser
            profilePicturePublicId={profilePicturePublicId}
            profilePictureUrl={profilePictureUrl}
          />
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
