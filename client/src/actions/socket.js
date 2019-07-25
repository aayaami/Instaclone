import { LOAD_SOCKET, CLEAR_SOCKET } from './types'

export const loadSocket = socket => dispatch => {
  try {
    dispatch({
      type: LOAD_SOCKET,
      payload: socket
    })
  } catch (err) {
    dispatch({
      type: CLEAR_SOCKET
    })
  }
}
