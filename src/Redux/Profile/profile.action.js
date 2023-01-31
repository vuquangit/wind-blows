import { REQUEST_API } from 'Middlewares/api'
import * as actionTypes from './actionType'

const createProfile = ({
  data = {},
  endpoint = 'auth',
  method = 'POST',
  headers = {}
} = {}) => ({
  [REQUEST_API]: {
    types: [
      actionTypes.PROFILE_REQUEST,
      actionTypes.PROFILE_SUCCESS,
      actionTypes.PROFILE_FAILURE
    ],
    endpoint,
    method,
    options: { data },
    headers
  }
})

const requestProfileInfo = ({
  data = {},
  endpoint = 'auth',
  method = 'GET',
  headers = {}
} = {}) => ({
  [REQUEST_API]: {
    types: [
      actionTypes.PROFILE_REQUEST,
      actionTypes.PROFILE_SUCCESS,
      actionTypes.PROFILE_FAILURE
    ],
    endpoint,
    method,
    options: { data },
    headers
  }
})

const updateProfileInfo = ({
  data = {},
  endpoint = 'auth',
  method = 'PUT',
  headers = {}
} = {}) => ({
  [REQUEST_API]: {
    types: [
      actionTypes.PROFILE_REQUEST,
      actionTypes.PROFILE_SUCCESS,
      actionTypes.PROFILE_FAILURE
    ],
    endpoint,
    method,
    options: { data },
    headers
  }
})

const updateUserProfile = data => ({
  type: actionTypes.PROFILE_UPDATE_USER,
  data
})

const clearMessage = () => ({
  type: actionTypes.PROFILE_CLEAR_MESSAGE
})

const signOut = () => ({ type: actionTypes.PROFILE_SIGNOUT })

export {
  createProfile,
  requestProfileInfo,
  updateProfileInfo,
  updateUserProfile,
  clearMessage,
  signOut
}
