import React from "react";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const NotificationFollowRequest = ({
  totalFollowRequests = 0,
  toggleFollowRequest = () => {}
}) => {
  return (
    <div
      className="notification__requests"
      role="button"
      onClick={toggleFollowRequest}
    >
      <Avatar className="notification__requests--avatar">
        {totalFollowRequests}
      </Avatar>
      <div className="notification__requests--description">
        <button className="description">
          <span className="description__title">Follow Requests</span>
          <span className="description__subtitle">
            Approve or ignore requests
          </span>
        </button>
      </div>
      <div className="notification__requests--direct">
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
};

export default NotificationFollowRequest;
