import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import IsLoading from "Components/IsLoading";
import ResultItem from "./ResultItem";

const SearchResults = ({
  value = "",
  items = [],
  isLoading = false,
  hasMoreItems = false,
  getMoreItems = () => {}
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => <ResultItem key={item.id || idx} {...item} />),
    [items]
  );

  return (
    <div>
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

export default SearchResults;
