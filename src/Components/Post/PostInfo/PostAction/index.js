import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faShareSquare,
  faBookmark as faBookmarkBlack
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import Heart from "Components/HeartIcon";
import ModalShare from "./ModalShare";
import classNames from "classnames";

const PostAction = ({
  isHomePage,
  likedByViewer,
  handleLikePost,
  savedByViewer
}) => {
  // Modal share button
  const [visibleModal, setVisibleModal] = useState(false);
  const showModalShare = () => {
    setVisibleModal(true);
  };
  const cancelModalShare = e => {
    setVisibleModal(false);
  };

  // Event save post
  const [isSavePost, setIsSavePost] = useState(savedByViewer);
  const handleSavePost = useCallback(() => {
    setIsSavePost(!isSavePost);
  }, [isSavePost]);

  // classNames
  const actionClass = classNames("PI__info--actions", {
    "homepage-info__action": isHomePage
  });

  return (
    <section className={actionClass}>
      <div className="action-item__content">
        <Button className="action-item__item" onClick={handleLikePost}>
          <Heart isLiked={likedByViewer} />
        </Button>
        <Button className="action-item__item">
          <FontAwesomeIcon icon={faComment} title="Comment" />
        </Button>
        <Button className="action-item__item">
          <FontAwesomeIcon
            icon={faShareSquare}
            title="Share"
            onClick={showModalShare}
          />
        </Button>
      </div>
      <div className="action-item__content">
        <Button className="action-item__item" onClick={handleSavePost}>
          <FontAwesomeIcon
            icon={isSavePost ? faBookmarkBlack : faBookmark}
            title={isSavePost ? "Bookmarked" : "Bookmark"}
          />
        </Button>
      </div>
      <ModalShare
        visibleModal={visibleModal}
        handleCancelModal={cancelModalShare}
      />
    </section>
  );
};

export default PostAction;
