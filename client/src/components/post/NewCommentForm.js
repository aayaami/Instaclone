import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createComment } from '../../actions/post'

const NewCommentForm = ({ createComment, postId }) => {
  const [text, setText] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    createComment({ text, postId })
    setText('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={text} onChange={e => setText(e.target.value)} />
    </form>
  )
}

NewCommentForm.propTypes = {
  createComment: PropTypes.func.isRequired
}

export default connect(
  null,
  { createComment }
)(NewCommentForm)
