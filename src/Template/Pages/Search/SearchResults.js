import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Pinwheel from "Components/Loaders/Pinwheel";
import ResultItem from "./ResultItem";

const SearchResults = ({
  value = "",
  items = [],
  isLoading = false,
  hasMoreItems = false,
  isTagPeople = false,
  getMoreItems = () => {}
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <ResultItem key={item.id || idx} {...item} isTagPeople={isTagPeople} />
      )),
    [isTagPeople, items]
  );

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
        className="search-result"
      >
        {_renderFollowItem()}
        {!isLoading && items && items.length === 0 && value && (
          <div className="search-result__empty">No result</div>
        )}
      </InfiniteScroll>
      {isLoading && <Pinwheel isLoading={isLoading} size={48} />}
    </>
  );
};

export default SearchResults;
