import React, { useEffect } from "react";
import axios from "utils/axiosConfig";
import { Badge } from "antd";
import { get, startsWith } from "lodash";
import { NavLink, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AvatarUser from "Components/AvatarUser";
import DropdownNotification from "./DropdownNotification";
import { updateNotifications } from "Redux/Notifications/notification.action";

const Menu = ({ match = {}, isSmallScreen = false }) => {
  const dispatch = useDispatch();
  const {
    username = "",
    id = "",
    profilePictureUrl = "",
    profilePicturePublicId = ""
  } = useSelector((state = {}) => get(state, "profile.data.user", ""));
  const { totalUnread: totalNotiUnread = 0 } = useSelector((state = {}) =>
    get(state, "notifications", {})
  );
  // const tokenUser = get(
  //   JSON.parse(localStorage.getItem("state") || {}),
  //   "profile.data.tokens.token",
  //   ""
  // );

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchNotiNew = async () => {
      try {
        const response = await axios({
          method: "post",
          url: "users/notifications/unread",
          data: {
            userId: id
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        const total = get(response, "data.totalUnread") || 0;
        await dispatch(updateNotifications(total));
      } catch (error) {
        console.log(error);
      }
    };

    // !isEmpty(tokenUser) && fetchNotiNew();
    fetchNotiNew();

    // unmount
    return async () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enableDropdownNoti = startsWith(match.path, "/notifications");

  return (
    <div className="header__menu">
      <div className="header__menu--items">
        {!isSmallScreen && (
          <div className="menu-item">
            <NavLink to="/explore/people/search/">
              <FontAwesomeIcon
                icon={faSearch}
                className="header__search--icon"
              />
            </NavLink>
          </div>
        )}
        <div className="menu-item">
          {!isSmallScreen && !enableDropdownNoti ? (
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

export default withRouter(Menu);
