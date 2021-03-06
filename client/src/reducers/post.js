import {
  LOAD_POST,
  CLEAR_POST,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_COMMENT_POST
} from '../actions/types'

const initialState = {
  post: null,
  postLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_POST:
      return {
        ...state,
        post: payload,
        postLoading: false
      }
    case UNLIKE_POST:
    case LIKE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          likes: payload.likes
        },
        postLoading: false
      }
    case CREATE_COMMENT_POST:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload.comments
        },
        postLoading: false
      }
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        postLoading: true
      }
    default:
      return state
  }
}
