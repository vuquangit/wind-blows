import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { Badge, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Activity from "Template/Pages/Activity";

const Menu = () => {
  const profile = useSelector((state = {}) => state.profile.data.user);
  const { username = "", id = "", profilePictureUrl = "" } = profile;

  return (
    <div className="header__menu">
      <div className="header__menu--items">
        <div className="menu-item">
          <NavLink to="/explore">
            <FontAwesomeIcon icon={faGlobeAsia} title="Explore" />
          </NavLink>
        </div>
        <div className="menu-item">
          <Badge count={9} overflowCount={99}>
            <FontAwesomeIcon icon={faFacebookMessenger} title="Messenger" />
          </Badge>
        </div>
        <div className="menu-item">
          <Activity />
        </div>
        <div className="menu-item">
          <NavLink to={`/${username || id}`}>
            <Badge count={0}>
              {profilePictureUrl ? (
                <Avatar
                  src={profilePictureUrl}
                  size={24}
                  title="Personal Page"
                />
              ) : (
                <Avatar icon="user" size={24} title="Personal Page" />
              )}
            </Badge>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
