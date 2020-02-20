import React from "react";
import IsLoading from "Components/IsLoading";

const NotificationLoading = () => {
  return (
    <div className="notification__is-loading">
      <IsLoading isLoading size={48} />
    </div>
  );
};

export default NotificationLoading;
