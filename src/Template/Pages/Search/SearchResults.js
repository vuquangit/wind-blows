import React, { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Pinwheel from 'Components/Loaders/Pinwheel'
import ResultItem from './ResultItem'

const SearchResults = ({
  value = '',
  items = [],
  isLoading = false,
  hasMoreItems = false,
  isTagPeople = false,
  getMoreItems = () => {},
  handleSelectSearchItem = () => {}
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <ResultItem
          key={item.id || idx}
          {...item}
          isTagPeople={isTagPeople}
          handleSelectSearchItem={handleSelectSearchItem}
        />
      )),
    [handleSelectSearchItem, isTagPeople, items]
  )

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
        className='search-result'
      >
        {_renderFollowItem()}
        {!isLoading && items && items.length === 0 && value && !isTagPeople && (
          <div className='search-result__empty'>No result</div>
        )}
      </InfiniteScroll>
      {isLoading && (
        <div className='search-result__is-loading'>
          <Pinwheel isLoading={isLoading} size={40} />
        </div>
      )}
    </>
  )
}

export default SearchResults
