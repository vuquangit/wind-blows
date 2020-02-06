import React, { useState, useCallback } from "react";
import classNames from "classnames";
import axios from "axios";
import { useSelector } from "react-redux";
import { get } from "lodash";

import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostOption from "./PostOption";
import "./post.scss";

const PostItem = ({
  id: postId,
  isModal = false,
  isHomePage = false,
  owner = {},
  numLikes = 0,
  likedByViewer = false,
  savedByViewer = false,
  location = {},
  sidecarChildren = [],
  relationship = {}
}) => {
  // fetch likes
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  const fetchLikePost = useCallback(
    async (endpoint = "") => {
      const source = axios.CancelToken.source();

      try {
        await axios({
          method: "post",
          url: `${SERVER_BASE_URL}/post/likes/${endpoint}`,
          data: {
            postId: postId,
            userId: viewerId
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        console.log(endpoint === "like" ? "liked" : "unlike");
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("cancelled");
        } else {
          console.log(err);
          throw err;
        }
      } finally {
      }
    },
    [SERVER_BASE_URL, postId, viewerId]
  );

  // Event post like
  const [isLikePost, setIsLikePost] = useState(likedByViewer);
  const [likeTotal, setLikeTotal] = useState(numLikes);
  const handleLikePost = useCallback(() => {
    setIsLikePost(!isLikePost);
    setLikeTotal(!isLikePost ? likeTotal + 1 : likeTotal - 1);

    // not watting
    isLikePost ? fetchLikePost("unlike") : fetchLikePost("like");
  }, [fetchLikePost, isLikePost, likeTotal]);

  // classNames
  const classPostItem = classNames("PI", { PI__modal: isModal });

  return (
    <article className={classPostItem}>
      <PostHeader
        isHomePage={isHomePage}
        owner={owner}
        location={location}
        relationship={relationship}
      />
      <PostImage
        isModal={isModal}
        isHomePage={isHomePage}
        likedByViewer={isLikePost}
        sidecarChildren={sidecarChildren}
        handleLikePost={handleLikePost}
      />
      <PostInfo
        isHomePage={isHomePage}
        postId={postId}
        owner={owner}
        numLikes={likeTotal}
        likedByViewer={isLikePost}
        savedByViewer={savedByViewer}
        handleLikePost={handleLikePost}
      />
      <PostOption postId={postId} />
    </article>
  );
};

export default PostItem;
