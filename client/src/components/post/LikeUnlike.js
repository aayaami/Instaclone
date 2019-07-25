import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/post'

const LikeUnlike = ({
  post: { likes, _id },
  auth: { user },
  likePost,
  unlikePost
}) => {
  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    if (user) {
      let isFound = false

      likes.forEach(like => {
        if (like.user == user._id) {
          setIsLiked(true)
          isFound = true
        }
      })
      if (!isFound) {
        setIsLiked(false)
      }
    }
  }, [likes, user])

  const likesNumber = likes.length != 0 ? likes.length : null

  return isLiked ? (
    <button className='button-like liked' onClick={() => unlikePost(_id)}>
      Unlike {likesNumber}
    </button>
  ) : (
    <button className='button-like' onClick={() => likePost(_id)}>
      Like {likesNumber}
    </button>
  )
}

LikeUnlike.propTypes = {
  auth: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { likePost, unlikePost }
)(LikeUnlike)
