import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";

import NotiLoading from "./NotificationLoading";
import NotificationItem from "./NotificationItem";

const Notification = ({
  items = [],
  isLoading = false,
  getMoreItems = () => {},
  hasMoreItems = false
}) => {
  const _renderItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <NotificationItem key={item.id || idx} {...item} />
      )),
    [items]
  );

  return (
    <div className="notification">
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
      >
        <div>Notifications</div>
        <div>{_renderItem()}</div>
      </InfiniteScroll>
      {isLoading && <NotiLoading />}
    </div>
  );
};

export default Notification;
