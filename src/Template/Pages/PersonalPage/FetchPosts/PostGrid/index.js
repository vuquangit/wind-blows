import React, { useCallback } from "react";
import { Col } from "antd";

import PersonalPostItem from "./PersonalPostItem";
import InfiniteScroll from "react-infinite-scroller";
import PostsLoading from "../PostsLoading";
import "./postGrid.scss";

const PostGrid = ({
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
        <Col key={item.id || idx} span={8}>
          <PersonalPostItem {...item} />
        </Col>
      )),
    [items]
  );

  return (
    <div className="post-grid">
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreItems}
        hasMore={hasMoreItems}
      >
        <div>{_renderFollowItem()}</div>
      </InfiniteScroll>
      {isLoading && <PostsLoading />}
    </div>
  );
};

export default PostGrid;
