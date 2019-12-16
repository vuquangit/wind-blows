import React from "react";
// import Moment from "react-moment";
import moment from "moment";

const PostTimeAgo = ({ postedAt }) => {
  const _timeAgo = moment(
    parseInt(
      postedAt +
        (postedAt.toString().length <= 13
          ? "0".repeat(13 - postedAt.toString().length)
          : "")
    )
  ).fromNow();

  return (
    <div className="PI__info--time-ago">
      <div className="time-ago">{_timeAgo}</div>
    </div>
  );
};

export default PostTimeAgo;
