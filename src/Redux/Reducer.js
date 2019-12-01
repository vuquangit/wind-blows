import { SET_AUTHENTICATED } from './ActionType';

const initialState = { isAuthenticated: false }

const todos = (state = initialState, action) => {
  switch (action.type) {
  case SET_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: action
    }
    default:
    return state
  }
}

export default todos
