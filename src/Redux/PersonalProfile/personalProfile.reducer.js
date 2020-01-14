import { merge } from "lodash";
import * as actionType from "./actionType";

const initState = {
  isFetching: true,
  data: {},
  error: false
};

export const personalProfileReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case actionType.PERSONAL_PROFILE_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    case actionType.PERSONAL_PROFILE_REQUEST:
      return { ...state, isFetching: true, error: false };
    case actionType.PERSONAL_PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        data: merge(state.data, action.data)
      };
    case actionType.PERSONAL_PROFILE_CLEAR:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: {}
      };
    default:
      return state;
  }
};

export default personalProfileReducer;
