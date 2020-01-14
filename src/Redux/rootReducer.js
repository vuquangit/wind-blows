import { combineReducers } from "redux";
import profile from "./Profile/profile.reducer";
import personalProfile from "./PersonalProfile/personalProfile.reducer";

const appReducer = combineReducers({
  profile,
  personalProfile
});

export default appReducer;
