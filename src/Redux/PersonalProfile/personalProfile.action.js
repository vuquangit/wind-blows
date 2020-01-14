import { REQUEST_API } from "Middlewares/api";
import * as actionTypes from "./actionType";

const requestPersonalInfo = ({ options = {}, username = "" } = {}) => ({
  [REQUEST_API]: {
    types: [
      actionTypes.PERSONAL_PROFILE_REQUEST,
      actionTypes.PERSONAL_PROFILE_SUCCESS,
      actionTypes.PERSONAL_PROFILE_FAILURE
    ],
    endpoint: `username/${username}`,
    options
  }
});

const clearPersonalProfile = () => ({
  type: actionTypes.PERSONAL_PROFILE_CLEAR
});

export { requestPersonalInfo, clearPersonalProfile };
