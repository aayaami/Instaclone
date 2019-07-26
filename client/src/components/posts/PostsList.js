import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import LikeUnlike from '../post/LikeUnlike'
import Comments from '../post/Comments'
import NewCommentForm from '../post/NewCommentForm'

const PostsList = ({ posts }) => {
  return (
    <ul className='content'>
      {posts.map(post => (
        <li key={post._id} className='post'>
          <Link to={`/users/${post.user._id}`}>
            <span className='nickname'>{post.user.name}</span>
          </Link>
          {post.image && (
            <div>
              <Link to={`/posts/${post._id}`}>
                <img
                  src={Buffer.from(post.image, 'base64').toString('ascii')}
                />
              </Link>
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
      ))}
    </ul>
  )
}

export default PostsList
