import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { message, Popconfirm } from "antd";

import axios from "utils/axiosConfig";
import { stopPropagation } from "utils/stopPropagation";
import {
  increaseNotifications,
  decreaseNotifications
} from "Redux/Notifications/notification.action";

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
        title="Are you sure to delete this notification?"
        onConfirm={handleDeleteNotification}
        okText="Yes"
        cancelText="No"
      >
        <span className=" sprite-icon__glyphs option-delete" />
      </Popconfirm>
      <div
        onClick={handleUnreadItem}
        style={{ lineHeight: 0 }}
        title={readNotification ? "Mark as unread" : "Mark as read"}
        className="SGI__options--mark-as"
      >
        <FontAwesomeIcon icon={faDotCircle} className="option-read" />
      </div>
    </div>
  );
};

export default Options;
