import * as actionType from "./actionType";

const initState = {
  totalUnread: 0,
  newNotifications: [],
  totalFollowRequest: 0
};

export const notificationReducer = (state = initState, action = {}) => {
  switch (action.type) {
    // update total notifications
    case actionType.NOTIFICATION_TOTAL_UNREAD:
      return { ...state, totalUnread: action.data };
    case actionType.NOTIFICATION_INCREASE:
      return { ...state, totalUnread: state.totalUnread + 1 };
    case actionType.NOTIFICATION_DECREASE:
      return {
        ...state,
        totalUnread:
          state.totalUnread > 0 ? state.totalUnread - 1 : state.totalUnread
      };
    // add new notifications
    case actionType.NOTIFICATION_NEW:
      return {
        ...state,
        totalUnread: state.totalUnread + 1,
        newNotifications: [...action.data, ...state.newNotifications]
      };
    case actionType.NOTIFICATION_CLEAR:
      return {
        ...state,
        newNotifications: []
      };

    // read all notifications
    case actionType.NOTIFICATION_RESET:
      if (state.newNotifications && state.newNotifications.length > 0) {
        const items = state.newNotifications.map(item => {
          return { ...item, read: true };
        });
        return {
          ...state,
          totalUnread: 0,
          newNotifications: items
        };
      } else
        return {
          ...state,
          totalUnread: 0
        };

    // follow requests
    case actionType.FOLLOW_REQUEST_TOTAL:
      return { ...state, totalFollowRequest: action.data };
    case actionType.FOLLOW_REQUEST_INCREASE:
      return { ...state, totalFollowRequest: state.totalFollowRequest + 1 };
    case actionType.FOLLOW_REQUEST_DECREASE:
      return {
        ...state,
        totalFollowRequest:
          state.totalFollowRequest > 0
            ? state.totalFollowRequest - 1
            : state.totalFollowRequest
      };

    default:
      return state;
  }
};

export default notificationReducer;
