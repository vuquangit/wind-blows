import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faHeart,
  faCommentAlt
} from "@fortawesome/free-solid-svg-icons";

import TimeFromNow from "Components/TimeFromNow";

const Description = ({ user = {}, notifications = {}, match = {} }) => {
  const { username = "", suggestionDescription = "", fullName = "" } = user;
  const { typeNotification = 0, text = "", timestamp = "" } = notifications;
  const subDescription = match.path === "/" ? suggestionDescription : fullName;

  return (
    <div className="SGI__info">
      {typeNotification === 0 || typeNotification === 1 ? (
        <div className="SGI__info--username">
          <Link to={`/${username}/`} title={username} className="username">
            {username}
          </Link>
        </div>
      ) : (
        <Link to={`/${username}/`} title={username} className="username">
          {username}
        </Link>
      )}
      {typeNotification === 0 ? (
        <div className="description-suggestions">{subDescription}</div>
      ) : typeNotification === 1 ? (
        " started following you."
      ) : typeNotification === 2 ? (
        " liked your photo."
      ) : typeNotification === 3 ? (
        <>
          like your comments:
          <span>"{text}"</span>
        </>
      ) : typeNotification === 4 ? (
        <>
          mentioned you in a comment:
          <span>"{text}"</span>
        </>
      ) : (
        " accepted your follow request."
      )}
      {typeNotification !== 0 && (
        <div className="SGI__description-more">
          {typeNotification === 1 || typeNotification === 5 ? (
            <FontAwesomeIcon
              icon={faUserPlus}
              className="SGI__description-more--icon-follow"
            />
          ) : typeNotification === 2 || typeNotification === 3 ? (
            <FontAwesomeIcon
              icon={faHeart}
              className="SGI__description-more--icon-heart"
            />
          ) : (
            typeNotification === 4 && (
              <FontAwesomeIcon
                icon={faCommentAlt}
                className="SGI__description-more--icon-comment"
              />
            )
          )}
          <TimeFromNow postedAt={timestamp} className="timestamp" />
        </div>
      )}
    </div>
  );
};

export default withRouter(Description);
