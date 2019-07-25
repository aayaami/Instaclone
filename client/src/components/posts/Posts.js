import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPosts } from '../../actions/posts'
import LikeUnlike from '../post/LikeUnlike'
import Comments from '../post/Comments'

const Posts = ({ loadPosts, posts: { posts, postsLoading } }) => {
  useEffect(() => {
    loadPosts()
  }, [])

  if (postsLoading) {
    return <Fragment>Loading</Fragment>
  } else if (posts.length < 1) {
    return <Fragment>No Posts</Fragment>
  } else {
    return (
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/users/${post.user._id}`}>{post.user.name}</Link>
            {post.image && (
              <div>
                <Link to={`/posts/${post._id}`}>
                  <img
                    src={Buffer.from(post.image, 'base64').toString('ascii')}
                  />
                </Link>
              </div>
            )}
            <div>
              <LikeUnlike post={post} />
              <Comments comments={post.comments} />
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

Posts.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(
  mapStateToProps,
  { loadPosts }
)(Posts)
