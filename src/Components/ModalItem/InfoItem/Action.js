import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import Heart from "../Heart";

const Action = ({ isLiked = true }) => {
  return (
    <div className="action-item">
      <div className="action-item__content">
        <div className="action-item__item">
          <Heart isLiked={isLiked} />
        </div>
        <div className="action-item__item">
          <FontAwesomeIcon icon={faComment} title="Comment" />
        </div>
        <div className="action-item__item">
          <FontAwesomeIcon icon={faShareSquare} title="Share" />
        </div>
      </div>
      <div className="action-item__content">
        <div className="action-item__item">
          <FontAwesomeIcon icon={faBookmark} title="Bookmark" />
        </div>
      </div>
    </div>
  );
};

export default Action;
