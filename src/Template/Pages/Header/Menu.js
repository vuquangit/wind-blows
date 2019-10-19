import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

function Menu() {
  return (
    <div className="header__menu">
      <div className="header__menu--items">
        <div className="menu-item">
          <a href="/">
            <FontAwesomeIcon icon={faFacebookMessenger} />
          </a>
        </div>
        <div className="menu-item">
          <a href="/">
            <FontAwesomeIcon icon={faHeartbeat} />
          </a>
        </div>
        <div className="menu-item">
          <a href="/">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
