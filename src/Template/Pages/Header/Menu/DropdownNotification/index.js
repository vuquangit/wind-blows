import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";

import Notifications from "Template/Pages/Notifications";
import "./activity.scss";

const DropdownNotification = ({ count = 0 }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <div className="activity">
      <Badge
        count={count}
        overflowCount={99}
        onClick={() => setIsOpenDropdown(true)}
      >
        <FontAwesomeIcon icon={faBell} title="Activity" />
      </Badge>
      {isOpenDropdown && (
        <div>
          <div className="activity__modal">
            <div
              className="activity__modal--a"
              onClick={() => setIsOpenDropdown(false)}
            />
            <div className="activity__modal--b" />
            <div className="activity__modal--c" />
            <div className="activity__modal--d">
              <div className="activity__content">
                <div className="activity__content--L1">
                  <div className="activity__content--L2">
                    <Notifications />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;
