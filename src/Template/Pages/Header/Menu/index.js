import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import axios from "axios";

import Activity from "Template/Pages/Activity";
import AvatarUser from "Components/AvatarUser";
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

  return (
    <div className="header__menu">
      <div className="header__menu--items">
        <div className="menu-item">
          <NavLink to="/notifications">
            <Badge count={totalNotiUnread} overflowCount={99}>
              <FontAwesomeIcon icon={faBell} title="Notifications" />
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
