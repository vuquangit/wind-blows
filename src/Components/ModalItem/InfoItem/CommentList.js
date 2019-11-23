import React from "react";
import { Comment, List } from "antd";

const CommentList = ({ comments = [] }) => (
  <div className="comment-list">
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  </div>
);

export default CommentList;
