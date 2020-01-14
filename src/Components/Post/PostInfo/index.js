import React, { useState } from "react";
import PostAction from "./PostAction";
import PeopleLiked from "./PeopleLiked";
import CommentList from "./CommentList";
import PostedAt from "./PostedAt";
import PostComment from "./PostComment";
import commentListData from "./commentListData.json";
import "./postInfo.scss";
import classNames from "classnames";

const PostInfo = ({
  numPreviewLikes,
  postedAt,
  isHomePage = false,
  likedByViewer = false,
  savedByViewer = false,
  handleLikePost
}) => {
  // Mock data list comment
  const [propsComment, setComment] = useState(commentListData);

  // classNames
  const infoClass = classNames("PI__info", {
    "homepage-info": isHomePage
  });

  // Request list comment of this post ???

  return (
    <div className={infoClass}>
      <PostAction
        isHomePage={isHomePage}
        handleLikePost={handleLikePost}
        likedByViewer={likedByViewer}
        savedByViewer={savedByViewer}
      />
      <PeopleLiked isHomePage={isHomePage} numPreviewLikes={numPreviewLikes} />
      <CommentList isHomePage={isHomePage} {...propsComment} />
      <PostedAt isHomePage={isHomePage} postedAt={postedAt} />
      <PostComment
        isHomePage={isHomePage}
        propsComment={propsComment}
        setComment={setComment}
      />
    </div>
  );
};

export default PostInfo;
