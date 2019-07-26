import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadUserProfile } from '../../actions/userProfile'
import { loadUserProfilePosts } from '../../actions/posts'
import UserProfilePosts from './UserProfilePosts'
import FollowUnfollow from './FollowUnfollow'

const User = ({
  userProfile: { userProfile, userProfileLoading },
  auth: { user, loading },
  match,
  loadUserProfile,
  loadUserProfilePosts
}) => {
  useEffect(() => {
    loadUserProfile(match.params.id)
    loadUserProfilePosts(match.params.id)
  }, [])
  // return userProfileLoading ? (
  //   <div>Loading</div>
  // ) : (
  //   <div>
  //     {userProfile._id !== user._id ? (
  //       <FollowUnfollow userProfile={userProfile} />
  //     ) : null}
  //     {userProfile.name}
  //     <UserProfilePosts />
  //   </div>
  // )
  if (loading) {
    return <Fragment />
  } else {
    return userProfileLoading ? (
      <Fragment />
    ) : (
      <div className='content profile-wrapper'>
        <section className='profile-header'>
          <span className='nickname'>{userProfile.name}</span>
          {userProfile._id !== user._id ? (
            <Fragment>
              <FollowUnfollow userProfile={userProfile} />
              <Link className='btn-action' to={`/chats/${userProfile._id}`}>
                Send Message
              </Link>
            </Fragment>
          ) : (
            <Link className='btn-action' to='/posts/create'>
              Create Post
            </Link>
          )}
        </section>
        <UserProfilePosts />
      </div>
    )
  }
}

User.propTypes = {
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
