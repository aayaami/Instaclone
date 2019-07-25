import {
  LOAD_POST,
  CLEAR_POST,
  LOAD_POSTS,
  CLEAR_POSTS,
  LIKE_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UNLIKE_POSTS,
  CREATE_COMMENT_POST,
  CREATE_COMMENT_POSTS
} from './types'
import axios from 'axios'
import store from '../store'

export const loadPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`)

    console.log(res.data)

    dispatch({
      type: LOAD_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_POST
    })
  }
}

export const createPost = ({ text, load }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { text, load }
  try {
    await axios.post('/api/posts', body, config)

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

export const likePost = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`)

    if (!store.getState().posts.postsLoading) {
      dispatch({
        type: LIKE_POSTS,
        payload: res.data
      })
    }

    if (!store.getState().post.postLoading) {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const unlikePost = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`)

    if (!store.getState().posts.postsLoading) {
      dispatch({
        type: UNLIKE_POSTS,
        payload: res.data
      })
    }

    if (!store.getState().post.postLoading) {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const createComment = ({ text, postId }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { text }
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, body, config)

    if (!store.getState().posts.postsLoading) {
      dispatch({
        type: CREATE_COMMENT_POSTS,
        payload: res.data
      })
    }

    if (!store.getState().post.postLoading) {
      dispatch({
        type: CREATE_COMMENT_POST,
        payload: res.data
      })
    }
  } catch (err) {
    console.log(err)
  }
}
