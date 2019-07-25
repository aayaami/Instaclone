import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPost } from '../../actions/post'
import LikeUnlike from './LikeUnlike'
import Comments from './Comments'
import NewCommentForm from './NewCommentForm'

const Post = ({ loadPost, post: { post, postLoading }, match }) => {
  useEffect(() => {
    loadPost(match.params.id)
  }, [])

  if (postLoading) {
    return <Fragment>Loading</Fragment>
  } else if (!post) {
    return <Fragment>No Post</Fragment>
  } else {
    return (
      <Fragment>
        {post.date}
        <div>
          <img src={Buffer.from(post.image, 'base64').toString('ascii')} />
        </div>
        <LikeUnlike post={post} />
        <Comments comments={post.comments} />
        <NewCommentForm postId={post._id} />
      </Fragment>
    )
  }
}

Post.propTypes = {
  loadPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { loadPost }
)(Post)
