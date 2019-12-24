import React, { useState } from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import PostTimeAgo from "Components/TimeFromNow";
import HeartIcon from "Components/HeartIcon";
import ModalItemOptions from "./ModalItemOptions";
import classNames from "classnames";

const CommentListItem = ({
  commentOwnerAvatar = "https://instagram.fsgn7-1.fna.fbcdn.net/v/t51.2885-19/s150x150/74962053_499046997632215_4287713981000318976_n.jpg?_nc_ht=instagram.fsgn7-1.fna.fbcdn.net&_nc_ohc=DsyWwQLv8J4AX9tZUA1&oh=30c6732a5bf837d9cffc6aa757dc8c9c&oe=5E719EBA",
  commentOwnerUsername = "lizkimcuong93",
  postOwnerIsUnpublished = false,
  viewerId = "1503958910",
  className = "PpGvg ",
  commentOwnerId = "966456675",
  isAuthorVerified = true,
  isCaption = true,
  isEdited = false,
  loggedIn = true,
  mediaType = 1,
  postedAt = 1503984756,
  postId = "1591861973712489532",
  postOwnerId = "966456675",
  showIGTVCaption = false,
  showRemoveIcon = false,
  showRichComment = true,
  text = "Content text....",
  code = "BYXbgfylcw8",
  commentThreadId = "17896213924052379",
  id = "17896213924052379",
  likeCount = 0,
  likedByViewer = false,
  isHomePage = false
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
  const handleLikedByViewer = () => {
    setLikedByViewer(!_likedByViewer);
    const countLike = !_likedByViewer ? ++likeCount : --likeCount;
    setLikeCount(countLike);
  };

  // className
  const itemW1 = classNames("CL__item--W1", { CL__CMTW1: isHomePage });

  // Request data of Owner comment ???

  return (
    <div className="CL__item">
      <div className={itemW1} role="menuitem">
        <div className="CL__item--W2">
          <div className="CL__item--content">
            {!isHomePage && (
              <div className="item__avatar">
                <Avatar src={commentOwnerAvatar} />
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
                      postedAt={postedAt}
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
                    visibleModal={visibleModalOptions}
                    handleCancelModal={handleCancelModalOptions}
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
