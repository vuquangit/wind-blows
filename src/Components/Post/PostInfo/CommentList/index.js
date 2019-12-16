import React from "react";
import CommentListItem from "./CommentListItem";

const CommentList = ({ comments = [] }) => {
  return (
    <div className="PI__info--comment-list">
      {comments &&
        comments.map((item, idx) => (
          <CommentListItem key={item.id || idx} {...item} isComment />
        ))}
    </div>
  );
};

export default CommentList;
