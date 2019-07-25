import {
  LOAD_POSTS,
  CLEAR_POSTS,
  LIKE_POSTS,
  UNLIKE_POSTS
} from '../actions/types'

const initialState = {
  posts: null,
  postsLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: payload,
        postsLoading: false
      }
    case UNLIKE_POSTS:
    case LIKE_POSTS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id == payload._id ? { ...post, likes: payload.likes } : post
        ),
        postsLoading: false
      }
    case CLEAR_POSTS:
      return {
        ...state,
        posts: null,
        postsLoading: true
      }
    default:
      return state
  }
}
