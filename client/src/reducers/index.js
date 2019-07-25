import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import socket from './socket'
import posts from './posts'
import post from './post'
import userProfile from './userProfile'

export default combineReducers({
  alert,
  auth,
  socket,
  posts,
  post,
  userProfile
})
