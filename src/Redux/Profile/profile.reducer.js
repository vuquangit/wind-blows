import { merge } from "lodash";
import * as actionType from "./actionType";

const initState = {
  isFetching: true,
  data: {},
  error: false,
  message: ""
};

export const profileReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case actionType.PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        message: action.message,
        isFetching: false
      };
    case actionType.PROFILE_REQUEST:
      return { ...state, isFetching: true, error: false, message: "" };
    case actionType.PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        message: "",
        isFetching: false,
        data: merge(state.data, action.data)
      };
    case actionType.PROFILE_SIGNOUT:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: "",
        data: {}
      };
    default:
      return state;
  }
};

export default profileReducer;
