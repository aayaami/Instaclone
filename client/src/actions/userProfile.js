import {
  LOAD_USER_PROFILE,
  CLEAR_USER_PROFILE,
  FOLLOWERS_UPDATED,
  FOLLOWERS_CLEARED
} from './types'
import axios from 'axios'

export const loadUserProfile = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}`)

    dispatch({
      type: LOAD_USER_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_USER_PROFILE
    })
  }
}

export const followUser = userId => async dispatch => {
  try {
    const res = await axios.put(`/api/users/follow/${userId}`)

    dispatch({
      type: FOLLOWERS_UPDATED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOWERS_CLEARED
    })
  }
}

export const unfollowUser = userId => async dispatch => {
  try {
    const res = await axios.put(`/api/users/unfollow/${userId}`)

    dispatch({
      type: FOLLOWERS_UPDATED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOWERS_CLEARED
    })
  }
}
