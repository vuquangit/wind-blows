import React, { useState, useCallback } from "react";
import classNames from "classnames";
import "./post.scss";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostOption from "./PostOption";

const PostItem = ({
  id: postId,
  isModal = false,
  isHomePage = false,
  owner = {},
  numPreviewLikes = 0,
  likedByViewer = false,
  savedByViewer = false,
  location = {},
  sidecarChildren = [],
  relationship = {}
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
      <PostHeader
        owner={owner}
        isHomePage={isHomePage}
        location={location}
        relationship={relationship}
      />
      <PostImage
        sidecarChildren={sidecarChildren}
        isModal={isModal}
        isHomePage={isHomePage}
        likedByViewer={isLikePost}
        handleLikePost={handleLikePost}
      />
      <PostInfo
        numPreviewLikes={likeTotal}
        isHomePage={isHomePage}
        likedByViewer={isLikePost}
        savedByViewer={savedByViewer}
        handleLikePost={handleLikePost}
        postId={postId}
        owner={owner}
      />
      <PostOption postId={postId} />
    </article>
  );
};

export default PostItem;
