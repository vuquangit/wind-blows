import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const ActivityItem = (props = {}) => {
  const { user, media } = props;
  // console.log(props);

  return (
    <div className="activity__item">
      <div className="activity__item--content">
        <Avatar src={user.profile_pic_url} />
        <div className="activity__item--description">
          <Link to={user.username} title={user.username} className="username">
            {user.username}
          </Link>
          {`liked your photo.`}
          <time
            datetime="2019-12-11T14:56:23.877Z"
            title="Dec 11, 2019"
            className="time"
          >
            15h
          </time>
        </div>
      </div>
      <div>
        <Avatar shape="square" src={media.thumbnail_src} />
      </div>
    </div>
  );
};

export default ActivityItem;
