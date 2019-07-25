import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUserProfile } from '../../actions/userProfile'
import { loadUserProfilePosts } from '../../actions/posts'
import UserProfilePosts from './UserProfilePosts'
import FollowUnfollow from './FollowUnfollow'

const User = ({
  userProfile: { userProfile, userProfileLoading },
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
      <FollowUnfollow userProfile={userProfile} />
      {userProfile.name}
      <UserProfilePosts />
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userProfile: state.userProfile
})

export default connect(
  mapStateToProps,
  { loadUserProfile, loadUserProfilePosts }
)(User)
