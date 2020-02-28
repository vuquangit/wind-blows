import React, { useCallback, useState } from "react";
import axios from "utils/axiosConfig";
import InfiniteScroll from "react-infinite-scroller";
import { get, startsWith } from "lodash";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import NotiLoading from "./NotificationItems/NotificationLoading";
import UserRelationship from "Components/UserRelationship";
import NotificationNew from "./NotificationItems/NotificationsNew";
import { resetNotifications } from "Redux/Notifications/notification.action";
import NotificationRequest from "./NotificationItems/NotificationRequest";
import FollowRequests from "./FollowRequests";

const Notification = ({
  items = [],
  isLoading = false,

  setAllItemsReaded = () => {},
  getMoreItems = () => {},
  hasMoreItems = false,
  match = {}
}) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );
  const totalFollowRequests = useSelector((state = {}) =>
    get(state, "notifications.totalFollowRequest", 0)
  );

  const dispatch = useDispatch();

  // handle read all notifications
  const handleReadAllNoti = async () => {
    try {
      await axios({
        method: "post",
        url: "/users/notifications/read-all",
        data: {
          userId: viewerId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      await dispatch(resetNotifications()); // noti === 0
      setAllItemsReaded();
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };

  const _renderItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <UserRelationship
          key={item.id || idx}
          user={get(item, "user") || {}}
          relationship={get(item, "user.relationship")}
          notifications={item}
        />
      )),
    [items]
  );

  const isDropdown = !startsWith(match.path, "/notifications");

  const classNotification = classNames("notification", {
    "notification-dropdown": isDropdown
  });

  const [isFollowRequest, setIsFollowRequest] = useState(false);
  const toggleFollowRequest = () => {
    setIsFollowRequest(!isFollowRequest);
  };

  return (
    <div className={classNotification}>
      {!isFollowRequest ? (
        <>
          <div className="notification__header">
            <h1 className="notification__header--title">Notifications</h1>
            <div>
              <Button
                onClick={handleReadAllNoti}
                className="notification__header--btn"
              >
                Mark all as read
              </Button>
              <Link to="/notifications">
                <Button className="notification__header--btn">See all</Button>
              </Link>
            </div>
          </div>
          <NotificationNew />
          {totalFollowRequests ? (
            <NotificationRequest
              totalFollowRequests={totalFollowRequests}
              toggleFollowRequest={toggleFollowRequest}
            />
          ) : null}
          <InfiniteScroll
            pageStart={0}
            loadMore={getMoreItems}
            hasMore={hasMoreItems}
            useWindow={!isDropdown}
          >
            {_renderItem()}
          </InfiniteScroll>
          {isLoading && <NotiLoading />}
        </>
      ) : (
        <FollowRequests
          totalFollowRequests={totalFollowRequests}
          toggleFollowRequest={toggleFollowRequest}
        />
      )}
    </div>
  );
};

export default withRouter(Notification);
