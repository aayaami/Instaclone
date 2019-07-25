import { LOAD_SOCKET, CLEAR_SOCKET } from '../actions/types'

const initialState = {
  socket: null,
  socketLoading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_SOCKET:
      return {
        ...state,
        socket: payload,
        socketLoading: false
      }
    case CLEAR_SOCKET:
      return {
        ...state,
        socket: null,
        socketLoading: true
      }
    default:
      return state
  }
}
