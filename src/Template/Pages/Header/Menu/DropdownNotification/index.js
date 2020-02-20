import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";

import Notifications from "Template/Pages/Notifications";
import "./dropdown.scss";

const DropdownNotification = ({ count = 0 }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <div className="dropdown">
      <Badge
        count={count}
        overflowCount={99}
        onClick={() => setIsOpenDropdown(true)}
      >
        <FontAwesomeIcon icon={faBell} title="Notifications" />
      </Badge>
      {isOpenDropdown && (
        <div className="dropdown__modal">
          <div
            className="dropdown__modal--a"
            onClick={() => setIsOpenDropdown(false)}
          />
          <div className="dropdown__modal--b" />
          <div className="dropdown__modal--c" />
          <div className="dropdown__modal--d">
            <Notifications />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;
