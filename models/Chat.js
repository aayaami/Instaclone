const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  messages: [
    {
      text: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('chats', ChatSchema)
