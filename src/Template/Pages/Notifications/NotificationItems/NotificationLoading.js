import React from "react";
import Pinwheel from "Components/Loaders/Pinwheel";

const NotificationLoading = () => {
  return (
    <div className="notification__is-loading">
      <Pinwheel isLoading size={48} />
    </div>
  );
};

export default NotificationLoading;
