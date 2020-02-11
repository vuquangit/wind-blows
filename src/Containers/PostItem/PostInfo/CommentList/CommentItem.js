import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import { get } from "lodash";
import { useSelector } from "react-redux";

import PostTimeAgo from "Components/TimeFromNow";
import HeartIcon from "Components/HeartIcon";
import ModalItemOptions from "./ModalItemOptions";
import ModalLikes from "../ModalLikes";
import AvatarUser from "Components/AvatarUser";

const CommentListItem = ({
  userId: commentOwnerId = "",
  isCaption = true,
  isEdited = false,
  postedAt = "",
  createdAt = "",
  postOwnerId = "",
  text = "",
  id: commentId = "",
  likeCount = 0,
  likedByViewer = false,
  isHomePage = false,
  handleDeleteComments = () => {}
}) => {
  // Modal of Option comment
  const [visibleModalOptions, setVisibleModalOptions] = useState(false);
  const showModalOptions = () => {
    setVisibleModalOptions(true);
  };
  const handleCancelModalOptions = e => {
    setVisibleModalOptions(false);
  };

  // Event like comment
  const [_likedByViewer, setLikedByViewer] = useState(likedByViewer);
  const [_likeCount, setLikeCount] = useState(likeCount);
  const [isLiking, setIsLiking] = useState(false);
  const sourceLikesComments = axios.CancelToken.source();

  const fetchLikesComments = async endpoint => {
    try {
      setIsLiking(true);

      await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/post/comments/likes/${endpoint}`,
        data: {
          commentsId: commentId,
          userId: get(viewerProfile, "id") || ""
        },
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: sourceLikesComments.token
      });

      setIsLiking(false);
      console.log(endpoint === "like" ? "liked comment" : "unlike comment");
    } catch (err) {
      setIsLiking(false);

      if (axios.isCancel(err)) {
        console.log("cancelled like comment");
      } else {
        console.log(err);
      }
    }
  };

  const handleLikedByViewer = () => {
    setLikedByViewer(!_likedByViewer);
    setLikeCount(!_likedByViewer ? _likeCount + 1 : _likeCount - 1);

    isLiking && sourceLikesComments.cancel("Request canceled.");
    !_likedByViewer ? fetchLikesComments("like") : fetchLikesComments("unlike");
  };

  // className
  const itemW1 = classNames("CL__item--W1", { CL__CMTW1: isHomePage });

  // fetch data of owner comment
  const viewerProfile = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );

  const [stateOwnerComments, setOwnerComments] = useState({
    isLoading: true,
    data: {},
    error: null
  });

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchOwnerComments = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${SERVER_BASE_URL}/user/${commentOwnerId}`,
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        setOwnerComments(prevState => ({
          ...prevState,
          data: { ...prevState.data, ...response.data },
          isLoading: false
        }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch personal");
        } else {
          setOwnerComments(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log(error);
        }
      } finally {
        // setOwnerComments(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    if (viewerProfile.id !== commentOwnerId) fetchOwnerComments();
    else {
      setOwnerComments(prevState => ({
        ...prevState,
        data: { ...prevState.data, ...viewerProfile }
      }));
    }

    // unmounth
    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    profilePictureUrl: commentOwnerAvatar = "",
    profilePicturePublicId: commentOwnerAvatarId = "",
    username: commentOwnerUsername = "",
    isVerified: isAuthorVerified = false
  } = get(stateOwnerComments, "data");

  // modal likes comments
  const [visibleModalLikes, setVisibleModalLikes] = useState(false);
  const showModalLikes = () => {
    setVisibleModalLikes(true);
  };
  const handleCancelModalLikes = e => {
    setVisibleModalLikes(false);
  };

  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user")
  );
  const endpoint = "/post/comments/likes";
  const params = { commentsId: commentId, viewerId: viewerId };

  return (
    <div className="CL__item">
      <div className={itemW1} role="menuitem">
        <div className="CL__item--W2">
          <div className="CL__item--content">
            {!isHomePage && (
              <div className="item__avatar">
                <AvatarUser
                  profilePicturePublicId={commentOwnerAvatarId}
                  profilePictureUrl={commentOwnerAvatar}
                  size={32}
                />
              </div>
            )}
            <div className="item__content">
              <h2 className="item__content--owner">
                <Link to={`/${commentOwnerUsername}/`} className="username">
                  {commentOwnerUsername}
                </Link>
                {isAuthorVerified && (
                  <span
                    className="sprite-icon__core verified__small"
                    title="Verified"
                  >
                    Verified
                  </span>
                )}
              </h2>
              <span>{text}</span>
              {!isHomePage && (
                <div className="item__content--posted-info">
                  <div className="info__content">
                    <PostTimeAgo
                      className="info__content--item info__content--time "
                      postedAt={postedAt || createdAt || new Date()}
                    />
                    {!isCaption && (
                      <>
                        {parseInt(_likeCount) > 0 && (
                          <>
                            <button
                              className="info__content--item"
                              onClick={showModalLikes}
                            >
                              {_likeCount} like
                            </button>
                            <ModalLikes
                              endpoint={endpoint}
                              params={params}
                              visibleModal={visibleModalLikes}
                              handleCancelModal={handleCancelModalLikes}
                            />
                          </>
                        )}
                        <button className="info__content--item">Reply</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isCaption && (
            <>
              {!isHomePage && (
                <div className="CL__item--option">
                  <button className="option__btn" onClick={showModalOptions}>
                    <span className=" sprite-icon__glyphs option__btn--icon" />
                  </button>
                  <ModalItemOptions
                    commentOwnerId={commentOwnerId}
                    commentId={commentId}
                    postOwnerId={postOwnerId}
                    visibleModal={visibleModalOptions}
                    handleCancelModal={handleCancelModalOptions}
                    handleDeleteComments={handleDeleteComments}
                  />
                </div>
              )}
              <Button
                className="CL__item--btn-heart"
                onClick={handleLikedByViewer}
              >
                <HeartIcon isLiked={_likedByViewer} size={12} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentListItem;
