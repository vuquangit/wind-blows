import { REQUEST_API } from 'Middlewares/api'
import * as actionTypes from './actionType'

const requestPersonalInfo = ({ data = '', headers = {} }) => ({
  [REQUEST_API]: {
    types: [
      actionTypes.PERSONAL_PROFILE_REQUEST,
      actionTypes.PERSONAL_PROFILE_SUCCESS,
      actionTypes.PERSONAL_PROFILE_FAILURE
    ],
    endpoint: 'username',
    method: 'POST',
    options: { data },
    headers
  }
})

const clearPersonalProfile = () => ({
  type: actionTypes.PERSONAL_PROFILE_CLEAR
})

const increaseCountPosts = () => ({ type: actionTypes.PROFILE_POSTS_INCREASE })

const decreaseCountPosts = () => ({ type: actionTypes.PROFILE_POSTS_DECREASE })

const increaseFollower = () => ({
  type: actionTypes.PROFILE_FOLLOWER_INCREASE
})

const decreaseFollower = () => ({
  type: actionTypes.PROFILE_FOLLOWER_DECREASE
})

const updateUserProfile = data => ({
  type: actionTypes.PROFILE_UPDATE_USER,
  data
})

export {
  requestPersonalInfo,
  clearPersonalProfile,
  increaseCountPosts,
  decreaseCountPosts,
  increaseFollower,
  decreaseFollower,
  updateUserProfile
}
