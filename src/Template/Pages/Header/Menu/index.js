import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { get } from "lodash";

import Activity from "Template/Pages/Activity";
import AvatarUser from "Components/AvatarUser";

const Menu = () => {
  const {
    username = "",
    id = "",
    profilePictureUrl = "",
    profilePicturePublicId = ""
  } = useSelector((state = {}) => get(state, "profile.data.user") || "");

  return (
    <div className="header__menu">
      <div className="header__menu--items">
        <div className="menu-item">
          <NavLink to="/explore">
            <FontAwesomeIcon icon={faGlobeAsia} title="Explore" />
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/messenger">
            <Badge count={9} overflowCount={99}>
              <FontAwesomeIcon icon={faFacebookMessenger} title="Messenger" />
            </Badge>
          </NavLink>
        </div>
        <div className="menu-item">
          <Activity />
        </div>
        <div className="menu-item">
          <NavLink to={`/${username || id}`}>
            <AvatarUser
              profilePicturePublicId={profilePicturePublicId}
              profilePictureUrl={profilePictureUrl}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
