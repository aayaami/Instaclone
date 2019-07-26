import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Comments = ({ comments, auth: { user } }) => {
  return comments ? (
    <div className='comments'>
      {comments.map(comment =>
        user._id == comment.user ? (
          <div key={comment._id}>
            <Link to={`/users/${user._id}`} className='nickname'>
              {user.name}
            </Link>{' '}
            {comment.text}
          </div>
        ) : (
          <div key={comment._id}>
            <Link to={`/users/${comment.user._id}`} className='nickname'>
              {comment.user.name}
            </Link>{' '}
            {comment.text}
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
