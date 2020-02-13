import React, { useEffect } from "react";
import axios from "axios";
import { Badge } from "antd";
import { get } from "lodash";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AvatarUser from "Components/AvatarUser";
import DropdownNotification from "./DropdownNotification";
import { updateNotifications } from "Redux/Notifications/notification.action";

const Menu = () => {
  const dispatch = useDispatch();
  const {
    username = "",
    id = "",
    profilePictureUrl = "",
    profilePicturePublicId = ""
  } = useSelector((state = {}) => get(state, "profile.data.user") || "");

  const { totalUnread: totalNotiUnread = 0 } = useSelector(
    (state = {}) => get(state, "notifications") || ""
  );
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    const fetchNotiNew = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `${SERVER_BASE_URL}/users/notifications/unread`,
          data: {
            userId: id
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        const total = get(response, "data.totalUnread") || 0;
        await dispatch(updateNotifications(total));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotiNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // notifications
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="header__menu">
      <div className="header__menu--items">
        <div className="menu-item">
          {!isSmallScreen ? (
            <DropdownNotification count={totalNotiUnread} />
          ) : (
            <NavLink to="/notifications">
              <Badge count={totalNotiUnread} overflowCount={99}>
                <FontAwesomeIcon icon={faBell} title="Notifications" />
              </Badge>
            </NavLink>
          )}
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
