import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUserProfile } from '../../actions/userProfile'
import { loadUserProfilePosts } from '../../actions/posts'
import UserProfilePosts from './UserProfilePosts'
import FollowUnfollow from './FollowUnfollow'

const User = ({
  userProfile: { userProfile, userProfileLoading },
  auth: { user },
  match,
  loadUserProfile,
  loadUserProfilePosts
}) => {
  useEffect(() => {
    loadUserProfile(match.params.id)
    loadUserProfilePosts(match.params.id)
  }, [])
  return userProfileLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      {userProfile._id !== user._id ? (
        <FollowUnfollow userProfile={userProfile} />
      ) : null}
      {userProfile.name}
      <UserProfilePosts />
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loadUserProfile, loadUserProfilePosts }
)(User)
