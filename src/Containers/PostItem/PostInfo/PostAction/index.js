import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faShareSquare,
  faBookmark as faBookmarkBlack
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import classNames from "classnames";
import axios from "utils/axiosConfig";
import { useSelector } from "react-redux";
import { get } from "lodash";

import Heart from "Components/HeartIcon";
import ModalShare from "./ModalShare";

const PostAction = ({
  isHomePage,
  likedByViewer,
  handleLikePost,
  savedByViewer,
  postId = ""
}) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

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

  const fetchSavePost = async (endpoint = "") => {
    try {
      const res = await axios({
        method: "post",
        url: `/saved/${endpoint}`,
        data: {
          userId: viewerId,
          postId: postId
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("saved res:", res);
      setIsSavePost(!isSavePost);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("cancelled save post");
      } else {
        console.log(error);
      }
    }
  };

  const handleSavePost = useCallback(async () => {
    setIsSavePost(!isSavePost);
    !isSavePost ? fetchSavePost("add") : fetchSavePost("delete");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
