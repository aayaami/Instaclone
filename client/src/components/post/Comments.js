import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Comments = ({ comments, auth: { user } }) => {
  return comments ? (
    <div className='comments'>
      {comments.map(comment =>
        user._id == comment.user ? (
          <div>
            <span className='nickname'>{user.name}</span> {comment.text}
          </div>
        ) : (
          <div>
            <span className='nickname'>{comment.user.name}</span> {comment.text}
          </div>
        )
      )}
    </div>
  ) : (
    <div> No comments </div>
  )
}

Comments.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(Comments)
