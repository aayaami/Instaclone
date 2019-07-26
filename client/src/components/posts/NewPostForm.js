import React, { Fragment, useState } from 'react'
import { createPost } from '../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'

const NewPostForm = ({ createPost }) => {
  const [formData, setFormData] = useState({
    image: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1 / 1,
    croppedAreaPixels: null,
    croppedImage: null
  })
  const [display, setDisplay] = useState('block')

  const handleSubmit = e => {
    e.preventDefault()
    createPost({ load: formData.croppedImage })
  }

  const fileSelectedHandler = async e => {
    const getBase64 = file => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setFormData({
          ...formData,
          image: reader.result
        })
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    }

    getBase64(e.target.files[0])
  }

  const onCropChange = crop => {
    setFormData({ ...formData, crop })
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setFormData({ ...formData, croppedAreaPixels })
  }

  const onZoomChange = zoom => {
    setFormData({ ...formData, zoom })
  }

  const cropImage = async () => {
    const croppedImage = await getCroppedImg(
      formData.image,
      formData.croppedAreaPixels
    )
    setDisplay('none')
    setFormData({ ...formData, croppedImage })
  }

  return (
    <Fragment>
      <form className='form-comment' onSubmit={e => handleSubmit(e)}>
        <input type='file' onChange={fileSelectedHandler} />
        <div>
          <button type='submit'>Upload</button>
        </div>
      </form>
      {formData.image && (
        <div className='crop-container' style={{ display: display }}>
          <Cropper
            image={formData.image}
            crop={formData.crop}
            zoom={formData.zoom}
            aspect={formData.aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
          <div className='controls' onClick={cropImage}>
            Crop
          </div>
        </div>
      )}

      {/* {formData.image && <img src={`${formData.image}`} />} */}
      {formData.croppedImage && <img src={`${formData.croppedImage}`} />}
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
