import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "utils/axiosConfig";
import { useDispatch } from "react-redux";
import { message, Popconfirm, Button } from "antd";

import {
  increaseNotifications,
  decreaseNotifications
} from "Redux/Notifications/notification.action";
import { stopPropagation } from "utils/stopPropagation";

const Options = ({
  readNotification = false,
  notificationId = "",
  toggleReadNotification = () => {},
  fetchReadItem = () => {},
  handleDeleteNotification = () => {}
}) => {
  const dispatch = useDispatch();

  const fetchUnreadItem = async () => {
    try {
      await axios({
        method: "post",
        url: "/users/notifications/unread",
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

  const handleUnreadItem = async e => {
    // stopPropagation(e);
    toggleReadNotification();

    if (readNotification) {
      await dispatch(increaseNotifications());
      await fetchUnreadItem();
    } else {
      await dispatch(decreaseNotifications());
      await fetchReadItem();
    }
  };

  return (
    <div className="SGI__options" onClick={e => stopPropagation(e)}>
      <Popconfirm
        placement="bottomRight"
        title={`Are you sure to delete this notification?`}
        onConfirm={handleDeleteNotification}
        okText="Yes"
        cancelText="No"
      >
        <span className=" sprite-icon__glyphs SGI__options--option" />
      </Popconfirm>
      <div onClick={handleUnreadItem} style={{ lineHeight: 0 }}>
        <FontAwesomeIcon
          icon={faDotCircle}
          title={readNotification ? `Unread` : "Read"}
          className="SGI__options--unread"
        />
      </div>
    </div>
  );
};

export default Options;
