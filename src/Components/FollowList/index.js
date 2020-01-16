import React, { useCallback } from "react";
import FollowItem from "Components/UserRelationship";
import IsLoading from "Components/IsLoading";
import InfiniteScroll from "react-infinite-scroller";
import "./followList.scss";

const FollowList = ({
  headerFollow = "",
  items = [],
  isLoading = false,
  hasMoreItems = false,
  getMoreItems = () => {}
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items.map((item, idx) => (
        <FollowItem
          key={item.user.id || idx}
          user={item.user}
          relationship={item.relationship}
        />
      )),
    [items]
  );

  return (
    <div className="follow-list">
      <div className="follow-list__header">
        <h1>{headerFollow}</h1>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <div>{_renderFollowItem()}</div>
      </InfiniteScroll>
      <IsLoading isLoading={isLoading} size={30} />
    </div>
  );
};

export default FollowList;
