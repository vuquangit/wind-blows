import React from "react";
import { faUser, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activity from "Template/Pages/Activity";

const Menu = () => {
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
          <NavLink to="/chang.gio">
            <Badge count={0}>
              <FontAwesomeIcon icon={faUser} title="Personal Page" />
            </Badge>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
