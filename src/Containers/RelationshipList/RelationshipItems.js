import React, { useCallback } from "react";
import FollowItem from "Components/UserRelationship";
import IsLoading from "Components/IsLoading";
import InfiniteScroll from "react-infinite-scroller";

import "./Relationship.scss";

const FollowList = ({
  headerText = "",
  items = [],
  isLoading = false,
  hasMoreItems = false,
  getMoreItems = () => {}
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
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
      {headerText && (
        <div className="follow-list__header">
          <h1>{headerText}</h1>
        </div>
      )}
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
      >
        <div>{_renderFollowItem()}</div>
      </InfiniteScroll>
      <IsLoading isLoading={isLoading} size={48} />
    </div>
  );
};

export default FollowList;
