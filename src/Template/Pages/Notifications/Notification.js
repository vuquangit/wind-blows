import React, { useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { get, startsWith } from "lodash";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import NotiLoading from "./NotificationLoading";
import UserRelationship from "Components/UserRelationship";
import NotificationNew from "./NotificationsNew";
import { resetNotifications } from "Redux/Notifications/notification.action";

const Notification = ({
  items = [],
  isLoading = false,
  setAllItemsReaded = () => {},
  getMoreItems = () => {},
  hasMoreItems = false,
  match = {}
}) => {
  const tokenUser = useSelector((state = {}) =>
    get(state, "profile.data.token", "")
  );
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

  const dispatch = useDispatch();
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  // handle read all notifications
  const handleReadAllNoti = async () => {
    try {
      await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/notifications/read-all`,
        data: {
          userId: viewerId
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`
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
  // const threshold = isDropdown ? 50 : 250;

  const classNotification = classNames("notification", {
    "notification-dropdown": isDropdown
  });

  return (
    <div className={classNotification}>
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
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
        // threshold={threshold}
        useWindow={!isDropdown}
      >
        {_renderItem()}
      </InfiniteScroll>
      {isLoading && <NotiLoading />}
    </div>
  );
};

export default withRouter(Notification);
