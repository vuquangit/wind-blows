import { SET_AUTHENTICATED } from "./ActionType";

const initialState = { isAuthenticated: true };

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.val
      };
    default:
      return state;
  }
};

export default todos;
