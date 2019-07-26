import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPostsFeed } from '../../actions/posts'
import LikeUnlike from '../post/LikeUnlike'
import Comments from '../post/Comments'
import NewCommentForm from '../post/NewCommentForm'
import PostsList from './PostsList'

const Posts = ({ loadPostsFeed, posts: { posts, postsLoading } }) => {
  useEffect(() => {
    loadPostsFeed()
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
  loadPostsFeed: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(
  mapStateToProps,
  { loadPostsFeed }
)(Posts)
