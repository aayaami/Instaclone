import React, { Fragment, useState } from 'react'
import { createPost } from '../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'mongoose'

const NewPostForm = ({ createPost }) => {
  const [formData, setFormData] = useState({ load: null })

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
  }

  return (
    <Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <input type='file' onChange={fileSelectedHandler} />
        <div>
          <button type='submit'>Upload</button>
        </div>
      </form>
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
