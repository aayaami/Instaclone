import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPost } from '../../actions/post'
import LikeUnlike from './LikeUnlike'
import Comments from './Comments'
import NewCommentForm from './NewCommentForm'
import Spinner from '../layout/Spinner'
import NoPosts from '../layout/NoPosts'
import { Link } from 'react-router-dom'

const Post = ({ loadPost, post: { post, postLoading }, match }) => {
  useEffect(() => {
    loadPost(match.params.id)
  }, [])

  if (postLoading) {
    return <Spinner />
  } else if (!post) {
    return <NoPosts />
  } else {
    return (
      <section className='content'>
        <li key={post._id} className='post'>
          <span className='nickname'>{post.user.name}</span>
          {post.image && (
            <div>
              <img src={Buffer.from(post.image, 'base64').toString('ascii')} />
            </div>
          )}
          <Fragment>
            <LikeUnlike post={post} />
            {post.comments.length > 0 ? (
              <Comments comments={post.comments} />
            ) : null}
            <NewCommentForm postId={post._id} />
          </Fragment>
        </li>
      </section>
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
