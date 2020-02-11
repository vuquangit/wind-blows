import * as actionType from "./actionType";

const initState = { totalUnread: 0 };

export const notificationReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case actionType.NOTIFICATION_UNREAD:
      return { ...state, totalUnread: action.data };
    case actionType.NOTIFICATION_INCREASE:
      return { ...state, totalUnread: state.totalUnread + 1 };
    case actionType.NOTIFICATION_DECREASE:
      if (state.totalUnread > 0)
        return { ...state, totalUnread: state.totalUnread - 1 };
    default:
      return state;
  }
};

export default notificationReducer;
