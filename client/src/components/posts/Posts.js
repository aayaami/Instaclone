import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPosts } from '../../actions/posts'

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
            <Link to={`/posts/${post._id}`}>{post._id}</Link>
            {post.image && (
              <img src={Buffer.from(post.image, 'base64').toString('ascii')} />
            )}
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
