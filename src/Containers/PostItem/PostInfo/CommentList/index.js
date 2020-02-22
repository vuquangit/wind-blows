import React, { useEffect, useCallback } from "react";
import { Divider, Button } from "antd";
import * as Scroll from "react-scroll";
import classNames from "classnames";
import { Link } from "react-router-dom";

import CommentItem from "./CommentItem";

const CommentList = ({
  captionAndTitle,
  postedAt = new Date(),
  owner = {},
  id: postId = "",
  commentsDisabled,
  comments,
  isHomePage,
  commentsTotalCount = 0,
  fetchMoreComments = () => {},
  setIsViewerComments = () => {},
  handleDeleteComments = () => {},
  IsViewerComments = false
}) => {
  // add scroll events
  useEffect(() => {
    Scroll.Events.scrollEvent.register("begin");
    Scroll.Events.scrollEvent.register("end");
    Scroll.scrollSpy.update();

    //componentWillUnmount
    return () => {
      Scroll.Events.scrollEvent.remove("begin");
      Scroll.Events.scrollEvent.remove("end");
    };
  }, []);

  // event scroll
  const scrollToEnd = useCallback(() => {
    Scroll.scroller.scrollTo("scroll-container__my-scroll", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutCirc",
      containerId: "scroll-container"
    });
  }, []);

  // effect scroll
  useEffect(() => {
    if (!isHomePage && IsViewerComments) {
      scrollToEnd();
      setIsViewerComments(false);
    }
  }, [
    comments,
    scrollToEnd,
    isHomePage,
    IsViewerComments,
    setIsViewerComments
  ]);

  // class styles
  const CLClass = classNames("PI__info--comment-list", {
    "homepage-info__CL": isHomePage
  });
  const CLContentClass = classNames("CL", {
    "homepage-info__CL--content": isHomePage
  });
  const CLCommentClass = classNames("CL__comment", { CLCMT: isHomePage });

  return (
    <div className={CLClass}>
      <div className={CLContentClass} id="scroll-container">
        {captionAndTitle && (
          <CommentItem
            isCaption
            isHomePage={isHomePage}
            userId={owner.id}
            postOwnerId={owner.id}
            text={captionAndTitle}
            id={postId}
            postedAt={postedAt}
          />
        )}
        {!commentsDisabled && comments && (
          <>
            {isHomePage && commentsTotalCount > 0 && (
              <Link to={`p/${postId}`} className="CL__comment--GTP">
                {`View all ${commentsTotalCount} comments`}
              </Link>
            )}
            {comments.map((item, idx) => (
              <div key={item.id || idx} className={CLCommentClass}>
                <CommentItem
                  {...item}
                  isCaption={false}
                  isHomePage={isHomePage}
                  postOwnerId={owner.id}
                  postId={postId}
                  handleDeleteComments={handleDeleteComments}
                />
              </div>
            ))}
            {!isHomePage && comments.length < commentsTotalCount && (
              <Divider className="CL__comment--divider">
                <Button onClick={fetchMoreComments}>Read more</Button>
              </Divider>
            )}
          </>
        )}
        <Scroll.Element name="scroll-container__my-scroll" />
      </div>
    </div>
  );
};

export default CommentList;
