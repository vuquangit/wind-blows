import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { get } from "lodash";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import NotiLoading from "./NotificationLoading";
import UserRelationship from "Components/UserRelationship";
import { clearNotifications } from "Redux/Notifications/notification.action";

const Notification = ({
  items = [],
  isLoading = false,
  getMoreItems = () => {},
  hasMoreItems = false
}) => {
  const dispatch = useDispatch();
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );

  const [state, setState] = useState({
    isLoading: false,
    isReadAll: false,
    error: null
  });

  const handleReadAllNoti = async () => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));

      await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/notifications/read-all`,
        data: {
          userId: viewerId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      await dispatch(clearNotifications());
      setState(prevState => ({ ...prevState, isReadAll: true }));
    } catch (error) {
      console.log(error);
      message.error("error");
    } finally {
      setState(prevState => ({
        ...prevState,
        isLoading: false
      }));
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
          isReadAll={state.isReadAll}
        />
      )),
    [items, state.isReadAll]
  );

  return (
    <div className="notification">
      <div className="notification__header">
        <Button
          onClick={handleReadAllNoti}
          className="notification__header--btn-read-all"
        >
          Mark all as read
        </Button>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
      >
        {_renderItem()}
      </InfiniteScroll>
      {isLoading && <NotiLoading />}
    </div>
  );
};

export default Notification;
