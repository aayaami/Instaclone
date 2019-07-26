import {
  LOAD_USER_PROFILE,
  CLEAR_USER_PROFILE,
  FOLLOWERS_CLEARED,
  FOLLOWERS_UPDATED
} from '../actions/types'

const initialState = {
  userProfile: null,
  userProfileLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
        userProfileLoading: false
      }
    case FOLLOWERS_UPDATED:
    case FOLLOWERS_CLEARED:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          followers: payload.followers
        },
        userProfileLoading: false
      }
    case CLEAR_USER_PROFILE:
      return {
        ...state,
        userProfile: null,
        userProfileLoading: true
      }
    default:
      return state
  }
}
