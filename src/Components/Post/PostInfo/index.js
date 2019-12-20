import React, { useState } from "react";
import PostAction from "./PostAction";
import PeopleLiked from "./PeopleLiked";
import CommentList from "./CommentList";
import PostedAt from "./PostedAt";
import PostComment from "./PostComment";
import commentListData from "./commentListData.json";
import "./postInfo.scss";

const PostInfo = ({ numPreviewLikes, postedAt }) => {
  const [propsComment, setComment] = useState(commentListData);
  // console.log(propsComment);

  // Request list comment of this post ???

  return (
    <div className="PI__info">
      <PostAction />
      <PeopleLiked numPreviewLikes={numPreviewLikes} />
      <CommentList {...propsComment} />
      <PostedAt postedAt={postedAt} />
      <PostComment propsComment={propsComment} setComment={setComment} />
    </div>
  );
};

export default PostInfo;
