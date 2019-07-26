import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LikeUnlike from '../post/LikeUnlike'
import Comments from '../post/Comments'

const Posts = ({ posts: { posts, postsLoading } }) => {
  if (postsLoading) {
    return <Fragment />
  } else if (posts.length < 1) {
    return <Fragment />
  } else {
    return (
      <section>
        <ul className='post-grid-wrapper'>
          {posts.map(post => (
            <li key={post._id} className='post-grid'>
              <div>
                <Link to={`/posts/${post._id}`}>
                  <img
                    src={Buffer.from(post.image, 'base64').toString('ascii')}
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(
  mapStateToProps,
  {}
)(Posts)
