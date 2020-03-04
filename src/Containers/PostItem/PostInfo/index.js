import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "utils/axiosConfig";
import { get, filter, isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";

import PostAction from "./PostAction";
import PostLikes from "./PostLikes";
import CommentList from "./CommentList";
import PostedAt from "./PostedAt";
import AddComments from "./AddComments";
import "./scss/postInfo.scss";

const PostInfo = ({
  postId = "",
  owner = {},
  numLikes = 0,
  postAt = "",
  isHomePage = false,
  likedByViewer = false,
  savedByViewer = false,
  sidecarChildren = {},
  handleLikePost = () => {}
}) => {
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
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
    return () => {
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

  // add post comments
  const handleAddComment = res => {
    setComments(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        comments: [...get(prevState, "data.comments", []), res]
      },
      commentsTotalCount: prevState.commentsTotalCount + 1
    }));

    console.log("add parent comment", stateComments);
  };
  const handleDeleteComment = commentId => {
    setComments(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        comments: filter(prevState.data.comments, item => item.id !== commentId)
      },
      commentsTotalCount:
        prevState.commentsTotalCount - 1 > 0
          ? prevState.commentsTotalCount - 1
          : 0
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
        sidecarChildren={sidecarChildren}
      />
      <PostLikes isHomePage={isHomePage} numLikes={numLikes} postId={postId} />
      <CommentList
        isHomePage={isHomePage}
        {...stateComments.data}
        owner={owner}
        IsViewerComments={IsViewerComments}
        fetchMoreComments={fetchMoreComments}
        setIsViewerComments={setIsViewerComments}
        handleDeleteComment={handleDeleteComment}
      />
      <PostedAt isHomePage={isHomePage} postedAt={postAt} />
      {viewerId ? (
        <div className="PI__info--post-comment">
          <AddComments
            isHomePage={isHomePage}
            postId={postId}
            handleAddComment={handleAddComment}
            setIsViewerComments={setIsViewerComments}
          />
        </div>
      ) : (
        <div className="PI__info--post-comment">
          <Link to="/accounts/login">
            <Button type="primary" block>
              Login to comment
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
