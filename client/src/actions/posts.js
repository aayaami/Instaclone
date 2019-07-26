import {
  LOAD_POSTS,
  CLEAR_POSTS,
  LOAD_USER_PROFILE_POSTS,
  CLEAR_USER_PROFILE_POSTS,
  LOAD_POSTS_FEED
} from './types'
import axios from 'axios'

export const loadPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    console.log(res.data)

    dispatch({
      type: LOAD_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_POSTS
    })
  }
}

export const loadPostsFeed = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts/feed')

    console.log(res.data)

    dispatch({
      type: LOAD_POSTS_FEED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_POSTS
    })
  }
}

export const loadUserProfilePosts = userId => async dispatch => {
  try {
    console.log(userId)
    const res = await axios.get(`/api/posts/user/${userId}`)

    console.log(res.data)

    dispatch({
      type: LOAD_USER_PROFILE_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_USER_PROFILE_POSTS
    })
  }
}
