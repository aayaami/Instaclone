import { LOAD_POST, CLEAR_POST, LOAD_POSTS, CLEAR_POSTS } from './types'
import axios from 'axios'

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

export const createPost = ({ text }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { text }
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
