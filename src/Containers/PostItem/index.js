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
  const [isLikingPost, setIsLikingPost] = useState(false);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  const sourceLikePost = axios.CancelToken.source();
  const fetchLikePost = useCallback(
    async (endpoint = "") => {
      setIsLikingPost(true);

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
          cancelToken: sourceLikePost.token
        });

        setIsLikingPost(false);
        console.log(endpoint === "like" ? "liked" : "unlike");
      } catch (err) {
        setIsLikingPost(false);

        if (axios.isCancel(err)) {
          console.log("cancelled like post");
        } else {
          console.log(err);
        }
      } finally {
      }
    },
    [SERVER_BASE_URL, postId, sourceLikePost.token, viewerId]
  );

  // Event post like
  const [isLikePost, setIsLikePost] = useState(likedByViewer);
  const [likeTotal, setLikeTotal] = useState(numLikes);
  const handleLikePost = useCallback(() => {
    setIsLikePost(!isLikePost);
    setLikeTotal(!isLikePost ? likeTotal + 1 : likeTotal - 1);

    // not watting
    isLikingPost && sourceLikePost.cancel("cancelled like post");
    isLikePost ? fetchLikePost("unlike") : fetchLikePost("like");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLikePost]);

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
      <PostOption postId={postId} owner={owner} relationship={relationship} />
    </article>
  );
};

export default PostItem;
