import { LOAD_POST, CLEAR_POST } from '../actions/types'

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
