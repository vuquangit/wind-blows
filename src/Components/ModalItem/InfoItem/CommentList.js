import React from "react";
import CommentItem from "../CommentItem";

const CommentList = ({ comments = [] }) => {
  console.log(comments);

  return (
    <div className="comment-list">
      {comments &&
        comments.map((item, idx) => (
          <CommentItem key={item.id || idx} {...item} isComment />
        ))}
    </div>
  );
};

export default CommentList;
