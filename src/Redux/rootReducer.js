import { combineReducers } from "redux";
import auth from "./Auth/auth.reducer";
import profile from "./Profile/profile.reducer";

const appReducer = combineReducers({
  auth,
  profile
});

export default appReducer;
