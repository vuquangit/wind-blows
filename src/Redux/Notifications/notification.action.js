import * as actionTypes from "./actionType";

const updateNotifications = data => ({
  type: actionTypes.NOTIFICATION_UNREAD,
  data
});

const increaseNotifications = () => ({
  type: actionTypes.NOTIFICATION_INCREASE
});

const decreaseNotifications = () => ({
  type: actionTypes.NOTIFICATION_DECREASE
});

const newNotifications = data => ({
  type: actionTypes.NOTIFICATION_NEW,
  data
});

const clearNewNotifications = () => ({
  type: actionTypes.NOTIFICATION_CLEAR
});

const resetNotifications = () => ({
  type: actionTypes.NOTIFICATION_RESET
});

export {
  updateNotifications,
  increaseNotifications,
  decreaseNotifications,
  newNotifications,
  clearNewNotifications,
  resetNotifications
};
