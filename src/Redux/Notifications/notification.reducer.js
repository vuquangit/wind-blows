import * as actionType from "./actionType";

const initState = { totalUnread: 0, newNotifications: [] };

export const notificationReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case actionType.NOTIFICATION_UNREAD:
      return { ...state, totalUnread: action.data };
    case actionType.NOTIFICATION_INCREASE:
      return { ...state, totalUnread: state.totalUnread + 1 };
    case actionType.NOTIFICATION_DECREASE:
      if (state.totalUnread > 0)
        return { ...state, totalUnread: state.totalUnread - 1 };
      else break;
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
    default:
      return state;
  }
};

export default notificationReducer;
