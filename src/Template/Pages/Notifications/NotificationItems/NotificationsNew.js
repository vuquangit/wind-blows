import React from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";

import UserRelationship from "Containers/UserRelationship";

const NotificationsNew = () => {
  const itemsNew = useSelector((state = {}) =>
    get(state, "notifications.newNotifications", [])
  );

  return (
    <>
      {itemsNew && itemsNew.length > 0 && (
        <>
          <div>
            <h2 className="notification__header--sub-title">
              New notifications
            </h2>
          </div>
          {itemsNew.map((item, idx) => (
            <UserRelationship
              key={item.id || idx}
              user={get(item, "user") || {}}
              relationship={get(item, "user.relationship")}
              notifications={item}
            />
          ))}
          <div>
            <h2 className="notification__header--sub-title">
              Notifications before
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationsNew;
