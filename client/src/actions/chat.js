import axios from 'axios'
import { GET_CHAT, CLEAR_CHAT, UPDATE_MESSAGES } from './types'

export const clearChat = () => dispatch => {
  try {
    dispatch({
      type: CLEAR_CHAT
    })
  } catch (err) {
    console.log(err)
  }
}

export const getChat = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/chats/${userId}`)
    dispatch({
      type: GET_CHAT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_CHAT
    })
  }
}

export const sendMessage = ({
  text,
  chat_id,
  socket,
  userChatId
}) => async dispatch => {
  try {
    const body = { text: text }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios.post(`/api/chats/message/${chat_id}`, body, config)
    await socket.socket.emit('update messages', userChatId)
  } catch (err) {
    console.log(err)
  }
}

export const refreshMessages = chatId => async dispatch => {
  try {
    console.log(chatId)
    const res = await axios.get(`/api/chats/messages/${chatId}`)

    dispatch({
      type: UPDATE_MESSAGES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
