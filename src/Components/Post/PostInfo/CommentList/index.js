import React from "react";
import CommentListItem from "./CommentListItem";
import { Divider } from "antd";

const CommentList = ({
  captionAndTitle,
  postedAt,
  ownerId,
  id,
  commentsDisabled,
  comments,
  ...restProps
}) => {
  // console.log(comments);

  return (
    <div className="PI__info--comment-list">
      <div className="CL">
        {captionAndTitle && (
          <CommentListItem
            isCaption
            userId={ownerId}
            text={captionAndTitle}
            id={id}
          />
        )}
        {!commentsDisabled && comments && (
          <Divider style={{ margin: 0, fontSize: "14px" }}>Read more</Divider>
        )}
        {!commentsDisabled &&
          comments &&
          comments.map((item, idx) => (
            <div key={item.id || idx} className="CL__comment">
              <CommentListItem isCaption={false} {...item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
