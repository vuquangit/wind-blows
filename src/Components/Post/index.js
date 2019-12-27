import React, { useState, useCallback } from "react";
import classNames from "classnames";
import "./post.scss";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostOption from "./PostOption";

const PostItem = ({
  isModal = false,
  isHomePage = false,
  owner = {},
  src = "",
  numPreviewLikes = 0,
  postedAt = new Date(),
  likedByViewer = false,
  savedByViewer = false,
  location = {}
}) => {
  // Event post like
  const [isLikePost, setIsLikePost] = useState(likedByViewer);
  const [likeTotal, setLikeTotal] = useState(numPreviewLikes);
  const handleLikePost = useCallback(() => {
    setIsLikePost(!isLikePost);
    setLikeTotal(!isLikePost ? likeTotal + 1 : likeTotal - 1);
  }, [isLikePost, likeTotal]);

  // classNames
  const classPostItem = classNames("PI", { PI__modal: isModal });

  return (
    <article className={classPostItem}>
      <PostHeader {...owner} isHomePage={isHomePage} location={location} />
      <PostImage
        src={src || ""}
        isModal={isModal}
        isHomePage={isHomePage}
        likedByViewer={isLikePost}
        handleLikePost={handleLikePost}
      />
      <PostInfo
        numPreviewLikes={likeTotal}
        postedAt={postedAt}
        isHomePage={isHomePage}
        likedByViewer={isLikePost}
        savedByViewer={savedByViewer}
        handleLikePost={handleLikePost}
      />
      <PostOption />
    </article>
  );
};

export default PostItem;
