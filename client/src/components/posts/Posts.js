import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPosts } from '../../actions/posts'
import LikeUnlike from '../post/LikeUnlike'
import Comments from '../post/Comments'
import NewCommentForm from '../post/NewCommentForm'
import PostsList from './PostsList'

const Posts = ({ loadPosts, posts: { posts, postsLoading } }) => {
  useEffect(() => {
    loadPosts()
  }, [])

  if (postsLoading) {
    return <Fragment />
  } else if (posts.length < 1) {
    return <Fragment />
  } else {
    return <PostsList posts={posts} />
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
