import { merge, isNumber, get, isEmpty } from "lodash";
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

    case actionType.PROFILE_POSTS_INCREASE:
      const increMedia = get(state, "data.user.counts.media", "");
      console.log("increase Media:", increMedia, isNumber(increMedia));

      if (isNumber(increMedia)) {
        const _media = {
          user: {
            counts: {
              media: increMedia + 1
            }
          }
        };

        return {
          ...state,
          data: merge(state.data, _media)
        };
      } else return state;
    case actionType.PROFILE_POSTS_DECREASE:
      const decreMedia = get(state, "data.user.counts.media", "");
      console.log("decreMedia", decreMedia, isNumber(decreMedia));
      if (isNumber(decreMedia) && decreMedia - 1 >= 0) {
        const _media = {
          user: {
            counts: {
              media: decreMedia - 1
            }
          }
        };

        return {
          ...state,
          data: merge(state.data, _media)
        };
      } else return state;
    default:
      return state;
  }
};

export default personalProfileReducer;
