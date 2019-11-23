import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faLike,
  faComment,
  faBookmark
} from "@fortawesome/free-regular-svg-icons";
import {
  faShareSquare,
  faHeart as faLiked
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const Action = ({ isLiked = true }) => {
  const icon = isLiked ? faLiked : faLike;
  const classHeart = classNames("action-item__item", { "item-liked": isLiked });

  return (
    <div className="action-item">
      <div className="action-item__content">
        <div className={classHeart}>
          <FontAwesomeIcon icon={icon} title="Like" />
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
