import React, { useState, useCallback, useEffect } from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import { get } from "lodash";

import PostTimeAgo from "Components/TimeFromNow";
import HeartIcon from "Components/HeartIcon";
import ModalItemOptions from "./ModalItemOptions";
import { useSelector } from "react-redux";

const CommentListItem = ({
  userId: commentOwnerId = "",
  isCaption = true,
  isEdited = false,
  postedAt = "",
  createdAt = "",
  postId = "",
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
  const handleLikedByViewer = useCallback(() => {
    setLikedByViewer(!_likedByViewer);
    setLikeCount(!_likedByViewer ? _likeCount + 1 : _likeCount - 1);
  }, [_likedByViewer, _likeCount]);

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
    username: commentOwnerUsername = "",
    isVerified: isAuthorVerified = false
  } = get(stateOwnerComments, "data");

  return (
    <div className="CL__item">
      <div className={itemW1} role="menuitem">
        <div className="CL__item--W2">
          <div className="CL__item--content">
            {!isHomePage && (
              <div className="item__avatar">
                {commentOwnerAvatar ? (
                  <Avatar src={commentOwnerAvatar} />
                ) : (
                  <Avatar src={commentOwnerAvatar} />
                )}
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
                          <button className="info__content--item">
                            {_likeCount} like
                          </button>
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
              <span className="CL__item--heart" onClick={handleLikedByViewer}>
                <HeartIcon isLiked={_likedByViewer} size={12} />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentListItem;
