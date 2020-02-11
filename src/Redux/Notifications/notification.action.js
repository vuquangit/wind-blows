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

export { updateNotifications, increaseNotifications, decreaseNotifications };
