import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faLike } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faLiked } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const Heart = ({ isLiked = true }) => {
  const icon = isLiked ? faLiked : faLike;
  const classHeart = classNames({ heart__liked: isLiked });
  const title = isLiked ? "Like" : "Unlike";

  return (
    <div className="heart">
      <div className={classHeart}>
        <FontAwesomeIcon icon={icon} title={title} />
      </div>
    </div>
  );
};

export default Heart;
