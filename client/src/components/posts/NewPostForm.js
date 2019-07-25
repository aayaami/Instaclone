import React, { Fragment, useState } from 'react'
import { createPost } from '../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const NewPostForm = ({ createPost }) => {
  const [formData, setFormData] = useState({
    text: '',
    load: null
  })

  const handleChange = e => {
    e.preventDefault()
    setFormData({
      ...formData,
      text: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createPost(formData)
  }

  const fileSelectedHandler = e => {
    setFormData({
      ...formData,
      load: e.target.files[0]
    })
  }

  const handleClick = () => {
    console.log({ formData })
  }

  const { text } = formData

  return (
    <Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          name='text'
          value={text}
          onChange={e => handleChange(e)}
        />
        <input type='file' onChange={fileSelectedHandler} />
        <button type='submit'>Upload</button>
      </form>
      <button onClick={handleClick}>Log</button>
    </Fragment>
  )
}

NewPostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { createPost }
)(NewPostForm)
