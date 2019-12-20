import React, { useEffect, useCallback } from "react";
import CommentListItem from "./CommentListItem";
import { Divider } from "antd";
import * as Scroll from "react-scroll";

const CommentList = ({
  captionAndTitle,
  postedAt,
  ownerId,
  id,
  commentsDisabled,
  comments,
  ...restProps
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
    scrollToEnd();
  }, [comments, scrollToEnd]);

  return (
    <div className="PI__info--comment-list">
      <div className="CL" id="scroll-container">
        {captionAndTitle && (
          <CommentListItem
            isCaption
            userId={ownerId}
            text={captionAndTitle}
            id={id}
          />
        )}
        {!commentsDisabled && comments && (
          <Divider style={{ margin: 0, fontSize: "14px", cursor: "pointer" }}>
            Read more
          </Divider>
        )}
        {!commentsDisabled &&
          comments &&
          comments.map((item, idx) => (
            <div key={item.id || idx} className="CL__comment">
              <CommentListItem isCaption={false} {...item} />
            </div>
          ))}

        <Scroll.Element name="scroll-container__my-scroll" />
      </div>
    </div>
  );
};

export default CommentList;
