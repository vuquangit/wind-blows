import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import Heart from "Components/HeartIcon";
import ModalShare from "./ModalShare";
import classNames from "classnames";

const PostAction = ({ isLiked = true, isHomePage }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const showModalShare = () => {
    setVisibleModal(true);
  };
  const cancelModalShare = e => {
    setVisibleModal(false);
  };

  const actionClass = classNames("PI__info--actions", {
    "homepage-info__action": isHomePage
  });

  return (
    <section className={actionClass}>
      <div className="action-item__content">
        <Button className="action-item__item">
          <Heart isLiked={isLiked} />
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
        <Button className="action-item__item">
          <FontAwesomeIcon icon={faBookmark} title="Bookmark" />
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
