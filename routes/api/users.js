const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Use valid email').isEmail(),
    check(
      'password',
      'Please enter password with 0 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({ name, email, password })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   GET api/users
// @desc    Get user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('name')
      .select('followers')

    res.json(user)
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route   PUT api/users/follow/:id
// @desc    Follow User
// @access  Private
router.put('/follow/:id', auth, async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ msg: "You can't follow yourself" })
  }
  try {
    console.log(req.params.id, 'follow')
    const userToFollow = await User.findById(req.params.id)
    const userFollowing = await User.findById(req.user.id)

    // Check if the user has already been followed
    if (
      userToFollow.followers.filter(
        follower => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You are already following this user' })
    }

    // Check if the user has already following
    if (
      userFollowing.following.filter(
        follow => follow.user.toString() === req.params.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You are already following this user' })
    }

    userToFollow.followers.unshift({ user: req.user.id })
    userFollowing.following.unshift({ user: req.params.id })

    await userToFollow.save()
    await userFollowing.save()

    res.json({ _id: userToFollow._id, followers: userToFollow.followers })
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/users/follow/:id
// @desc    Unfollow User
// @access  Private
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id, 'unfollow')
    const userToFollow = await User.findById(req.params.id)
    const userFollowing = await User.findById(req.user.id)

    // Check if the user has already been followed
    if (
      userToFollow.followers.filter(
        follower => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'User has not been yet followed' })
    }

    // Check if the user has already been followed
    if (
      userFollowing.following.filter(
        follow => follow.user.toString() === req.params.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'User has not been yet followed' })
    }

    console.log(req.params.id, 'unfollow')

    // Get remove index
    const removeIndex = userToFollow.followers
      .map(follower => follower.user.toString())
      .indexOf(req.user.id)

    // Get remove index 2
    const removeIndex2 = userFollowing.following
      .map(follow => follow.user.toString())
      .indexOf(req.params.id)

    userToFollow.followers.splice(removeIndex, 1)
    userFollowing.following.splice(removeIndex2, 1)

    await userToFollow.save()
    await userFollowing.save()

    res.json({ _id: userToFollow._id, followers: userToFollow.followers })
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
