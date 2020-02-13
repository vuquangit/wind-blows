import React from "react";
import axios from "axios";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { isEqual, get } from "lodash";
import { Image } from "cloudinary-react";
import { Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faHeart,
  faCommentAlt
} from "@fortawesome/free-solid-svg-icons";

import { decreaseNotifications } from "Redux/Notifications/notification.action";
import FollowStatus from "Containers/FollowStatus";
import AvatarUser from "Components/AvatarUser";
import TimeFromNow from "Components/TimeFromNow";
import "./userRelationship.scss";

const UserRelationship = ({
  user = {},
  relationship = {},
  notifications = {},
  match,
  history
}) => {
  const dispatch = useDispatch();
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const {
    id = "",
    profilePictureUrl = "",
    profilePicturePublicId = "",
    username = "",
    suggestionDescription = "",
    fullName = "",
    requestedByViewer = false
  } = user;

  const {
    id: notificationId = "",
    typeNotification = 0,
    text = "",
    timestamp = "",
    media = {},
    read: notiReaded = false
  } = notifications;

  const { id: viewerId = "" } = useSelector(
    (state = {}) => get(state, "profile.data.user") || {}
  );
  const subDescription = match.path === "/" ? suggestionDescription : fullName;
  const isMe = isEqual(id, viewerId);
  const photoPublicId = get(media, "sidecarChildren[0].public_id") || "";
  const postId = get(media, "id") || "";

  // handle click div
  const fetchReadItem = async () => {
    try {
      await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/notifications/read`,
        data: {
          id: notificationId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };

  const handleClickItem = async () => {
    const _redirect =
      typeNotification === 0 || typeNotification === 1
        ? `/${username}`
        : `/p/${postId}`;

    await fetchReadItem();
    await dispatch(decreaseNotifications());
    history.push(_redirect);
  };

  // styles
  const classSGI = classNames("SGI", {
    SGI__unread: typeNotification !== 0 && !notiReaded
  });

  return (
    <div
      className={classSGI}
      onClick={() => {
        typeNotification !== 0 && handleClickItem();
      }}
    >
      <div className="SGI__avatar">
        <Link to={`/${username}/`} title={username}>
          <AvatarUser
            profilePicturePublicId={profilePicturePublicId}
            profilePictureUrl={profilePictureUrl}
            size={32}
          />
        </Link>
      </div>
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
          "started following you."
        ) : typeNotification === 2 ? (
          " liked your photo."
        ) : typeNotification === 3 ? (
          <>
            like your comments:
            <span style={{ fontStyle: "italic" }}>{text}</span>
          </>
        ) : (
          <>
            mentioned you in a comment:
            <span style={{ fontStyle: "italic" }}>{text}</span>
          </>
        )}
        {typeNotification !== 0 && (
          <div className="SGI__description-more">
            {typeNotification === 1 ? (
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
      {typeNotification === 0 || typeNotification === 1
        ? !isMe && (
            <div className="SGI__follow">
              {!requestedByViewer ? (
                <FollowStatus
                  user={user}
                  viewerId={viewerId}
                  relationship={relationship}
                />
              ) : (
                <Button>Accept</Button>
              )}
            </div>
          )
        : photoPublicId && (
            <div className="SGI__photo">
              <Link to={`/p/${postId}`} className="SGI__photo--redirect">
                <Image
                  publicId={photoPublicId}
                  className="SGI__photo--cloudinary"
                />
              </Link>
            </div>
          )}
    </div>
  );
};

export default withRouter(UserRelationship);
