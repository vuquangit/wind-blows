import React, { useCallback } from "react";
import { Col } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { isEmpty } from "lodash";

import PersonalPostItem from "./PersonalPostItem";
import PostsLoading from "../PostsLoading";
import "./postGrid.scss";

const PostGrid = ({
  items = [],
  isLoading = false,
  hasMoreItems = false,
  getMoreItems = () => {},
  handleRemovePersonalPost = () => {}
}) => {
  const _renderFollowItem = useCallback(
    () =>
      items &&
      items.length > 0 &&
      items.map(
        (item, idx) =>
          !isEmpty(item) && (
            <Col key={item.id || idx} span={8}>
              <PersonalPostItem
                {...item}
                handleRemovePersonalPost={handleRemovePersonalPost}
              />
            </Col>
          )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
