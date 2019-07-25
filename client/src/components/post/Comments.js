import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Comments = ({ comments, auth: { user } }) => {
  return comments ? (
    <ul>
      {comments.map(comment =>
        user._id == comment.user._id ? (
          <li>
            {user.name} {comment.text}
          </li>
        ) : (
          <li>
            {comment.user.name} {comment.text}
          </li>
        )
      )}
    </ul>
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
