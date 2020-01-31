import React, { useEffect, useCallback } from "react";
import CommentListItem from "./CommentListItem";
import { Divider } from "antd";
import * as Scroll from "react-scroll";
import classNames from "classnames";
import { Link } from "react-router-dom";

const CommentList = ({
  captionAndTitle,
  ownerId,
  id,
  commentsDisabled,
  comments,
  isHomePage
}) => {
  useEffect(() => {
    // componentDidMount
    // Scroll.Events.scrollEvent.register("begin", function(to, element) {
    //   console.log("begin", arguments);
    // });

    // Scroll.Events.scrollEvent.register("end", function(to, element) {
    //   console.log("end", arguments);
    // });
    Scroll.Events.scrollEvent.register("begin");
    Scroll.Events.scrollEvent.register("end");
    Scroll.scrollSpy.update();

    //componentWillUnmount
    return () => {
      Scroll.Events.scrollEvent.remove("begin");
      Scroll.Events.scrollEvent.remove("end");
    };
  }, []);

  const scrollToEnd = useCallback(() => {
    Scroll.scroller.scrollTo("scroll-container__my-scroll", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutCirc",
      containerId: "scroll-container"
    });
  }, []);

  useEffect(() => {
    // !isHomePage && scrollToEnd();
  }, [comments, scrollToEnd, isHomePage]);

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
          <CommentListItem
            isCaption
            isHomePage={isHomePage}
            userId={ownerId}
            text={captionAndTitle}
            id={id}
          />
        )}
        {!commentsDisabled &&
          comments &&
          (!isHomePage ? (
            <Divider className="CL__comment--divider">Read more</Divider>
          ) : (
            <Link to="p/codepost" className="CL__comment--GTP">
              View all 99 comments
            </Link>
          ))}
        {!commentsDisabled &&
          comments &&
          comments.map((item, idx) => (
            <div key={item.id || idx} className={CLCommentClass}>
              <CommentListItem
                isCaption={false}
                isHomePage={isHomePage}
                {...item}
              />
            </div>
          ))}

        <Scroll.Element name="scroll-container__my-scroll" />
      </div>
    </div>
  );
};

export default CommentList;
