import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const Owner = ({
  username = "",
  fullName = "",
  isVerified = false,
  profilePictureUrl = "",
  text = "",
  likeCount = 8,
  isComment = false
}) => {
  const like = parseInt(likeCount, 10) > 0 ? true : false;

  return (
    <div className="owner">
      <Link to={username} title={username} className="owner__avatar">
        <Avatar src={profilePictureUrl} alt={fullName} size={32} />
      </Link>
      <div className="owner__info">
        <h2 className="owner__info--username">
          <Link to={username} title={username}>
            {username}
          </Link>
        </h2>
        {isVerified && (
          <span className="owner__info--verified" title="Verified">
            Verified
          </span>
        )}
        {text && <span>{text}</span>}
        {isComment && (
          <div className="owner__comment">
            <div className="owner__comment--content">
              <time
                className="content-item"
                dateTime="2019-11-21T15:32:20.000Z"
                title="Nov 21, 2019"
              >
                3d
              </time>
              {like && (
                <button className="content-item">{likeCount} like</button>
              )}
              <button className="content-item">Reply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Owner;
