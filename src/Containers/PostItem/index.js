import React, { useState, useCallback } from "react";
import classNames from "classnames";
import axios from "utils/axiosConfig";
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
  postAt = "",
  likedByViewer = false,
  savedByViewer = false,
  location = {},
  sidecarChildren = [],
  relationship = {},
  handleCancelModalPost = () => {}
}) => {
  // fetch likes
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );

  // const sourceLikePost = axios.CancelToken.source();
  const fetchLikePost = useCallback(
    async (endpoint = "") => {
      try {
        await axios({
          method: "post",
          url: `/post/likes/${endpoint}`,
          data: {
            postId: postId,
            userId: viewerId
          },
          headers: {
            "Content-Type": "application/json"
          }
          // cancelToken: sourceLikePost.token
        });

        console.log(endpoint === "like" ? "liked post" : "unlike post");
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("cancelled like post");
        } else {
          console.log(err);
        }
      }
    },
    [postId, viewerId]
  );

  // Event post like
  const [isLikePost, setIsLikePost] = useState(likedByViewer);
  const [likeTotal, setLikeTotal] = useState(numLikes);
  const handleLikePost = useCallback(() => {
    setIsLikePost(!isLikePost);
    setLikeTotal(!isLikePost ? likeTotal + 1 : likeTotal - 1);

    // not watting
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
        postAt={postAt}
        likedByViewer={isLikePost}
        savedByViewer={savedByViewer}
        handleLikePost={handleLikePost}
      />
      <PostOption
        postId={postId}
        owner={owner}
        relationship={relationship}
        handleCancelModalPost={handleCancelModalPost}
      />
    </article>
  );
};

export default PostItem;
