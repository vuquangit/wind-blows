import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";
import { get } from "lodash";

import PostAction from "./PostAction";
import PeopleLiked from "./PeopleLiked";
import CommentList from "./CommentList";
import PostedAt from "./PostedAt";
import PostComment from "./PostComment";
import "./postInfo.scss";

const PostInfo = ({
  postId = "",
  owner = {},
  numLikes = 0,
  isHomePage = false,
  likedByViewer = false,
  savedByViewer = false,
  handleLikePost
}) => {
  // fetch comments data
  const [stateComments, setComments] = useState({
    isLoading: true,
    data: {},
    error: null,
    limit: isHomePage ? 3 : 12,
    page: 1,
    commentsTotalCount: 0
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  useEffect(() => {
    const feactCommentsData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${SERVER_BASE_URL}/post/comments`,
          params: {
            postId: postId,
            limit: stateComments.limit,
            page: stateComments.page
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        setComments(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            ...response.data,
            comments: [
              ...(get(prevState, "data.comments") || []),
              ...get(response, "data.comments")
            ]
          },
          commentsTotalCount: get(response, "data.commentsTotalCount")
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setComments(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    feactCommentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateComments.page]);

  // get more comments
  const fetchMoreComments = () => {
    stateComments.commentsTotalCount > 0 &&
      stateComments.data.comments.length < stateComments.commentsTotalCount &&
      setComments(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  //
  const { postedAt = new Date() } = get(stateComments, "data");

  // add post comments
  const handleCommentsPost = res => {
    setComments(prevState => ({
      ...prevState,
      data: { comments: [...(get(prevState, "data.comments") || []), res] }
    }));
  };
  const [IsViewerComments, setIsViewerComments] = useState(false);

  // classNames
  const infoClass = classNames("PI__info", {
    "homepage-info": isHomePage
  });

  return (
    <div className={infoClass}>
      <PostAction
        isHomePage={isHomePage}
        handleLikePost={handleLikePost}
        likedByViewer={likedByViewer}
        savedByViewer={savedByViewer}
      />
      <PeopleLiked isHomePage={isHomePage} numLikes={numLikes} />
      <CommentList
        isHomePage={isHomePage}
        {...stateComments.data}
        owner={owner}
        IsViewerComments={IsViewerComments}
        fetchMoreComments={fetchMoreComments}
        setIsViewerComments={setIsViewerComments}
      />
      <PostedAt isHomePage={isHomePage} postedAt={postedAt} />
      <PostComment
        isHomePage={isHomePage}
        postId={postId}
        handleCommentsPost={handleCommentsPost}
        setIsViewerComments={setIsViewerComments}
      />
    </div>
  );
};

export default PostInfo;