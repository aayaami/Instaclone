import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import socket from './socket'
import posts from './posts'
import post from './post'

export default combineReducers({
  alert,
  auth,
  socket,
  posts,
  post
})
