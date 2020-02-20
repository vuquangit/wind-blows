import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "utils/axiosConfig";
import { get, filter, isEmpty } from "lodash";

import PostAction from "./PostAction";
import PostLikes from "./PostLikes";
import CommentList from "./CommentList";
import PostedAt from "./PostedAt";
import AddComments from "./AddComments";
import "./postInfo.scss";
import { useSelector } from "react-redux";

const PostInfo = ({
  postId = "",
  owner = {},
  numLikes = 0,
  isHomePage = false,
  likedByViewer = false,
  savedByViewer = false,
  handleLikePost = () => {}
}) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

  // fetch comments data
  const [stateComments, setComments] = useState({
    isLoading: true,
    data: {},
    error: null,
    limit: isHomePage ? 3 : 12,
    page: 1,
    commentsTotalCount: 0
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const feactCommentsData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/post/comments",
          params: {
            postId: postId,
            viewerId: viewerId,
            limit: stateComments.limit,
            page: stateComments.page
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        // console.log("reponse comments", response);

        if (!isEmpty(response.data)) {
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
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch comments");
        } else {
          setComments(prevState => ({ ...prevState, isLoading: false }));
          console.log(error);
        }
      }
    };

    feactCommentsData();

    // unmount
    return async () => {
      source.cancel();
    };
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
  const handleAddComments = res => {
    setComments(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        comments: [...(get(prevState, "data.comments") || []), res]
      }
    }));
  };
  const handleDeleteComments = commentsId => {
    setComments(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        comments: filter(
          get(prevState, "data.comments") || [],
          o => o.id !== commentsId
        )
      }
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
        postId={postId}
        handleLikePost={handleLikePost}
        likedByViewer={likedByViewer}
        savedByViewer={savedByViewer}
      />
      <PostLikes isHomePage={isHomePage} numLikes={numLikes} postId={postId} />
      <CommentList
        isHomePage={isHomePage}
        {...stateComments.data}
        owner={owner}
        IsViewerComments={IsViewerComments}
        fetchMoreComments={fetchMoreComments}
        setIsViewerComments={setIsViewerComments}
        handleDeleteComments={handleDeleteComments}
      />
      <PostedAt isHomePage={isHomePage} postedAt={postedAt} />
      <AddComments
        isHomePage={isHomePage}
        postId={postId}
        handleAddComments={handleAddComments}
        setIsViewerComments={setIsViewerComments}
      />
    </div>
  );
};

export default PostInfo;
