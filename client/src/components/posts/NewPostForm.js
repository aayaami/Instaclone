import React, { Fragment, useState } from 'react'
import { createPost } from '../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'mongoose'

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

  const fileSelectedHandler = async e => {
    const getBase64 = file => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setFormData({
          ...formData,
          load: reader.result
        })
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    }

    getBase64(e.target.files[0])

    // console.log(e.target.files[0])
    // setFormData({
    //   ...formData,
    //   load: e.target.files[0]
    // })
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
      {formData.load && <img src={`${formData.load}`} />}
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
