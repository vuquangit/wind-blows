import * as actionTypes from './actionType'

const updateNotifications = data => ({
  type: actionTypes.NOTIFICATION_TOTAL_UNREAD,
  data
})

const increaseNotifications = () => ({
  type: actionTypes.NOTIFICATION_INCREASE
})

const decreaseNotifications = () => ({
  type: actionTypes.NOTIFICATION_DECREASE
})

const newNotifications = data => ({
  type: actionTypes.NOTIFICATION_NEW,
  data
})

const clearNewNotifications = () => ({
  type: actionTypes.NOTIFICATION_CLEAR
})

const resetNotifications = () => ({
  type: actionTypes.NOTIFICATION_RESET
})

const updateFollowRequests = data => ({
  type: actionTypes.FOLLOW_REQUEST_TOTAL,
  data
})

const increaseFollowRequest = () => ({
  type: actionTypes.FOLLOW_REQUEST_INCREASE
})

const decreaseFollowRequest = () => ({
  type: actionTypes.FOLLOW_REQUEST_DECREASE
})

export {
  updateNotifications,
  increaseNotifications,
  decreaseNotifications,
  newNotifications,
  clearNewNotifications,
  resetNotifications,
  updateFollowRequests,
  increaseFollowRequest,
  decreaseFollowRequest
}
