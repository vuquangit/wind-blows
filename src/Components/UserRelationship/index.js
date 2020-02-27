import React from "react";
import axios from "utils/axiosConfig";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { message } from "antd";
import { withRouter } from "react-router-dom";

import { decreaseNotifications } from "Redux/Notifications/notification.action";
import AvatarUR from "./AvatarUR";
import Description from "./Description";
import Target from "./Target";
import "./userRelationship.scss";

const UserRelationship = ({
  user = {},
  relationship = {},
  notifications = {},
  history = {}
}) => {
  const dispatch = useDispatch();
  const { username = "" } = user;
  const {
    id: notificationId = "",
    typeNotification = 0,
    media = {},
    read: notiReaded = false
  } = notifications;
  const postId = get(media, "id", "");

  // handle click div
  const fetchReadItem = async () => {
    try {
      await axios({
        method: "post",
        url: "/users/notifications/read",
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
    await fetchReadItem();
    await dispatch(decreaseNotifications());

    history.push(
      typeNotification === 0 || typeNotification === 1 || typeNotification === 5
        ? `/${username}`
        : `/p/${postId}`
    );
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
      <AvatarUR user={user} />
      <Description user={user} notifications={notifications} />
      <Target
        user={user}
        notifications={notifications}
        relationship={relationship}
      />
    </div>
  );
};

export default withRouter(UserRelationship);
