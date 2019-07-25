import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/userProfile'

const FollowUnfollow = ({
  userProfile: { followers, _id },
  auth: { user },
  followUser,
  unfollowUser
}) => {
  const [isFollowed, setIsFollowed] = useState(false)
  useEffect(() => {
    if (user) {
      let isFound = false

      followers.forEach(follower => {
        if (follower.user == user._id) {
          setIsFollowed(true)
          isFound = true
        }
      })
      if (!isFound) {
        setIsFollowed(false)
      }
    }
  }, [followers, user])

  const followersNumber = followers.length != 0 ? followers.length : null

  return !isFollowed ? (
    <button onClick={() => followUser(_id)}>Follow {followersNumber}</button>
  ) : (
    <button onClick={() => unfollowUser(_id)}>
      Unfollow {followersNumber}
    </button>
  )
}

FollowUnfollow.propTypes = {
  auth: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { followUser, unfollowUser }
)(FollowUnfollow)
