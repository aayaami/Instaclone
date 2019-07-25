import { LOAD_POSTS, CLEAR_POSTS } from './types'
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
