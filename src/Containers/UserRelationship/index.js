import React, { useState } from "react";
import axios from "utils/axiosConfig";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { get, isEmpty } from "lodash";
import { message } from "antd";
import { withRouter } from "react-router-dom";

import { decreaseNotifications } from "Redux/Notifications/notification.action";
import AvatarUR from "./AvatarUR";
import Description from "./Description";
import Target from "./Target";
import Options from "./Options";
import "./userRelationship.scss";
import { useEffect } from "react";

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
    read = false
  } = notifications;
  const postId = get(media, "id", "");

  // toggle read notification
  const [readNotification, setReadNotification] = useState(false);
  useEffect(() => {
    setReadNotification(read);
  }, [read]);
  const toggleReadNotification = () => {
    setReadNotification(!readNotification);
  };

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

  // delete notification
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDeleteNotification = async () => {
    try {
      await axios({
        method: "post",
        url: "/users/notifications/delete",
        data: {
          id: notificationId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      message.info("Deleted notification");
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };

  // styles
  const classSGI = classNames("SGI", {
    SGI__unread: typeNotification !== 0 && !readNotification
  });

  return (
    <>
      {!isDeleted ? (
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
          {!isEmpty(notifications) && (
            <Options
              readNotification={readNotification}
              notificationId={notificationId}
              toggleReadNotification={toggleReadNotification}
              fetchReadItem={fetchReadItem}
              handleDeleteNotification={handleDeleteNotification}
            />
          )}
        </div>
      ) : (
        <div className="SGI__deleted" />
      )}
    </>
  );
};

export default withRouter(UserRelationship);