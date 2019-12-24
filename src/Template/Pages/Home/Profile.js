import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Profile = ({
  isVerified = true,
  name = "Chàng Gió 🐾",
  profilePictureUrl = "https://instagram.fsgn10-1.fna.fbcdn.net/v/t51.2885-19/s150x150/75553997_2258267614274135_3945426274582790144_n.jpg?_nc_ht=instagram.fsgn10-1.fna.fbcdn.net&_nc_ohc=5Jsfi2PpUI0AX89Ly3L&oh=481d4c11406c905c9d8fca5101fa0980&oe=5EA7E1E1",
  username = "chang.gio"
}) => {
  return (
    <div className="profile">
      <div className="profile__content">
        <Link to={`/${username}/`}>
          <Avatar src={profilePictureUrl} size={50} />
        </Link>
        <div className="profile__content--info">
          <div className="info__username">
            <Link to={`/${username}/`}>{username}</Link>
            {isVerified && (
              <span
                className=" sprite-icon__core verified__small"
                title="Verified"
              >
                Verified
              </span>
            )}
          </div>
          <div className="info__name">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
