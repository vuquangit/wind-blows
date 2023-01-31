import { combineReducers } from 'redux'
import profile from './Profile/profile.reducer'
import personalProfile from './PersonalProfile/personalProfile.reducer'
import notifications from './Notifications/notification.reducer'

const appReducer = combineReducers({
  profile,
  personalProfile,
  notifications
})

export default appReducer
