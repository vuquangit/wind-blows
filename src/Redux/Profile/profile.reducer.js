import { merge } from "lodash";
import * as actionType from "./actionType";

const initState = {
  isFetching: false,
  data: {},
  error: false,
  message: null
};

export const profileReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case actionType.PROFILE_REQUEST:
      return { ...state, isFetching: true, error: false, message: null };
    case actionType.PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        message: null,
        isFetching: false,
        data: merge(state.data, action.data)
      };
    case actionType.PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        message: action.message,
        isFetching: false
      };
    case actionType.PROFILE_SIGNOUT:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: null,
        data: {}
      };
    case actionType.PROFILE_UPDATE_USER:
      return {
        ...state,
        data: {
          ...state.data,
          user: merge(state.data.user, action.data)
        }
      };
    case actionType.PROFILE_CLEAR_MESSAGE:
      return {
        ...state,
        message: null
      };

    default:
      return state;
  }
};

export default profileReducer;
