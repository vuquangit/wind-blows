import React, { useEffect } from "react";
import { Badge } from "antd";
import { get, startsWith } from "lodash";
import { NavLink, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

import axios from "utils/axiosConfig";
import AvatarUser from "Components/AvatarUser";
import DropdownNotification from "./DropdownNotification";
import { updateNotifications } from "Redux/Notifications/notification.action";

const Menu = ({ isScrolled = false, isSmallScreen = false, match = {} }) => {
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

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchNotiNew = async () => {
      try {
        const response = await axios({
          method: "post",
          url: "users/notifications/total-unread",
          data: {
            userId: id
          },
          headers: {
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        const total = get(response, "data.totalUnread", 0);
        await dispatch(updateNotifications(total));

        // document.title
        // /\([\d]+\)/.test(title)
        const title = "The wind blows";
        if (total && total > 0) {
          document.title = `(${total}) ${title}`;
        } else {
          document.title = title;
        }
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
  const isPersonalPage = startsWith(match.path, "/:username");

  return (
    <div className="header__menu">
      <div className="header__menu--items">
        {!isSmallScreen && (
          <div className="menu-item">
            <NavLink to={`/`}>
              <FontAwesomeIcon icon={faHome} title="Home" />
            </NavLink>
          </div>
        )}
        {isSmallScreen && (
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
            <DropdownNotification
              count={totalNotiUnread}
              isScrolled={isScrolled}
            />
          ) : (
            <NavLink to="/notifications">
              <Badge count={totalNotiUnread} overflowCount={99}>
                <FontAwesomeIcon icon={faBell} title="Notifications" />
              </Badge>
            </NavLink>
          )}
        </div>
        <div className="menu-item">
          {isPersonalPage && <div className="menu-item__wrapper" />}
          <NavLink to={`/${username}`}>
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
