import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Slider from "react-slick";
import { settings } from "./configSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserRelationship from "Containers/UserRelationship";
import Pinwheel from "Components/Loaders/Pinwheel";
import "./Relationship.scss";

const FollowList = ({
  headerText = "",
  items = [],
  isLoading = false,
  hasMoreItems = false,
  getMoreItems = () => {},
  isSlider = false
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <UserRelationship
          key={item.user.id || idx}
          user={item.user}
          relationship={item.relationship}
          isSlider={isSlider}
        />
      )),
    [isSlider, items]
  );

  return (
    <>
      {!isSlider ? (
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

          {isLoading && <Pinwheel size={48} />}
        </div>
      ) : (
        <>
          <Slider {...settings} className="relationship-slider">
            {_renderFollowItem()}
            {isLoading && <Pinwheel size={48} />}
          </Slider>
        </>
      )}
    </>
  );
};

export default FollowList;
