import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";
import { get, isEmpty } from "lodash";
import { useSelector } from "react-redux";

import axios from "utils/axiosConfig";
import PostTimeAgo from "Components/TimeFromNow";
import HeartIcon from "Components/HeartIcon";
import ModalItemOptions from "./ModalItemOptions";
import ModalLikes from "../ModalLikes";
import AvatarUser from "Components/AvatarUser";

const CommentContent = ({
  userId: commentOwnerId = "",
  isCaption = true,
  postedAt = "",
  createdAt = "",
  postOwnerId = "",
  text = "",
  id: commentId = "",
  deleted = false,
  likeCount = 0,
  likedByViewer = false,
  isHomePage = false,
  isReply = false,
  handleReplyTo = () => {},
  handleDeleteComment = () => {},
  history = {}
}) => {
  // Modal of Option comment
  const [visibleModalOptions, setVisibleModalOptions] = useState(false);
  const showModalOptions = () => setVisibleModalOptions(true);
  const handleCancelModalOptions = () => setVisibleModalOptions(false);

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
        url: `/post/comments/likes/${endpoint}`,
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

  // fetch data of owner comment
  const viewerProfile = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

  const [stateOwnerComments, setOwnerComments] = useState({
    isLoading: true,
    data: {},
    error: null
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchOwnerComments = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `/user/${commentOwnerId}`,
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        // console.log("response user coment: ", response);
        if (!isEmpty(response))
          setOwnerComments(prevState => ({
            ...prevState,
            data: { ...prevState.data, ...response.data },
            isLoading: false
          }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch user comment");
        } else {
          setOwnerComments(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log(error);
        }
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
  } = get(stateOwnerComments, "data", {});

  // modal likes comments
  const [visibleModalLikes, setVisibleModalLikes] = useState(false);
  const showModalLikes = () => {
    setVisibleModalLikes(true);
  };
  const handleCancelModalLikes = e => {
    setVisibleModalLikes(false);
  };

  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );
  const endpoint = "/post/comments/likes";
  const params = { commentsId: commentId, viewerId: viewerId };

  const requestLogin = () => {
    Modal.confirm({
      title: "The Wind Blows",
      content: "Please log in to continue......",
      okText: "Login",
      cancelText: "Cancel",
      onOk() {
        history.push("/accounts/login");
      }
    });
  };

  const classRepply = classNames("info__content--item", {
    "info__content--reply": isReply
  });

  const createMarkup = () => {
    const _text = text.replace(
      /@([a-z\d_]+)/gi,
      `<a href="${window.location.origin}/$1" className="notranslate">@$1</a>`
    );

    return {
      __html: _text
    };
  };

  return (
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
          <span
            dangerouslySetInnerHTML={createMarkup()}
            className="item__content--text"
          ></span>
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
                          onClick={viewerId ? showModalLikes : requestLogin}
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
                    {viewerId && (
                      <button
                        className={classRepply}
                        onClick={() => handleReplyTo(commentOwnerUsername)}
                      >
                        Reply
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isCaption && viewerId && (
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
                handleDeleteComment={handleDeleteComment}
              />
            </div>
          )}
          <Button className="CL__item--btn-heart" onClick={handleLikedByViewer}>
            <HeartIcon isLiked={_likedByViewer} size={12} />
          </Button>
        </>
      )}
    </div>
  );
};

export default withRouter(CommentContent);
