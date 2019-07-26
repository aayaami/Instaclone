const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Chat = require('../../models/Chat')
const ObjectId = require('mongodb').ObjectID

// @route   GET api/chats/me
// @desc    Get my chats
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { user: req.user.id } }
    })

    if (!chats) {
      return res.status(400).json({ msg: 'No chats' })
    }

    res.json(chats)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/chats/message/:userId
// @desc    Message
// @access  Private
router.post(
  '/message/:userId',
  [
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      let chat
      const chats = await Chat.find({
        users: { $elemMatch: { user: ObjectId(req.user.id) } }
      })

      chats.forEach(pm => {
        pm.users.forEach(user => {
          if (user.user == req.params.userId) {
            chat = pm
          }
        })
      })

      if (!chat) {
        chat = new Chat({
          users: [],
          messages: []
        })

        chat.users.push({ user: req.user.id })
        chat.users.push({ user: req.params.userId })
      }

      chat.messages.push({ text: req.body.text, user: req.user.id })

      await chat.save()
      res.json(chat)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   PUT api/chats/deletemessage/:chatId/:messageId
// @desc    Delete message
// @access  Private
router.put('/deletemessage/:chatId/:messageId', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)

    if (!chat) {
      return res.status(401).json({ msg: 'Chat does not exist' })
    }

    let isMatchMessage = await chat.messages
      .map(message => message.user)
      .indexOf(req.params.messageId)
    let isMatchUser = await chat.users
      .map(user => user.user)
      .indexOf(req.user.id)
    let isMatchAdmin = await chat.admins
      .map(user => user.user)
      .indexOf(req.user.id)

    if (isMatchMessage === -1) {
      return res.status(404).json({ msg: 'No such message' })
    }

    if (isMatchUser === -1) {
      return res.status(404).json({ msg: 'Not authorized' })
    }

    if (isMatchAdmin !== -1) {
      isMatchAdmin = 1
    }

    if (
      chat.users[isMatchUser].user === chat.messages[isMatchMessage].user ||
      isMatchAdmin
    ) {
      chat.messages.splice(isMatchMessage, 1)
    } else {
      return res.status(400).json({ errors: [{ msg: 'Not authorized' }] })
    }

    await chat.save()

    res.json(chat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   Get api/chats/messages/:chatId
// @desc    Get chat messages
// @access  Private
router.get('/messages/:chatId', auth, async (req, res) => {
  try {
    console.log(req.params.chatId, 'w', req.user.id)
    let chat
    const chats = await Chat.find({
      users: { $elemMatch: { user: ObjectId(req.user.id) } }
    })

    chats.forEach(pm => {
      pm.users.forEach(user => {
        if (user.user == req.params.chatId) {
          chat = pm
        }
      })
    })

    console.log(chat)

    if (!chat) {
      return res.status(401).json({ msg: 'Chat does not exist' })
    }

    res.json(chat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   Get api/chats/:userId
// @desc    Get chat
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    let chat
    const chats = await Chat.find({
      users: { $elemMatch: { user: ObjectId(req.user.id) } }
    })

    chats.forEach(pm => {
      pm.users.forEach(user => {
        if (user.user == req.params.userId) {
          chat = pm
        }
      })
    })

    if (!chat) {
      chat = new Chat({
        users: [],
        messages: []
      })

      chat.users.push({ user: req.user.id })
      chat.users.push({ user: req.params.userId })
    }

    await chat.save()
    res.json(chat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
