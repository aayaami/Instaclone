import React, { Fragment, useState, useRef } from 'react'
import { createPost } from '../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'

const NewPostForm = ({ createPost }) => {
  const inputFile = useRef()
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
    if (e.target.files.length === 0) {
      return
    }
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
    <section className='content'>
      <section className='profile-wrapper'>
        <section className='profile-header'>
          <form onSubmit={e => handleSubmit(e)}>
            <input
              className='btn-action'
              type='file'
              onChange={fileSelectedHandler}
              ref={inputFile}
              style={{ position: 'absolute', top: '-120px' }}
            />
            <button
              type='reset'
              className='btn-action'
              style={{ width: '100%' }}
              onClick={() => inputFile.current.click()}
            >
              Choose...
            </button>
            <div>
              <button
                className='btn-action'
                style={{ width: '100%' }}
                type='submit'
              >
                Upload
              </button>
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
              <button
                className='btn-action controls'
                style={{ margin: '0rem 40%' }}
                onClick={cropImage}
              />
            </div>
          )}

          {/* {formData.image && <img src={`${formData.image}`} />} */}
          {formData.croppedImage && (
            <img
              style={{
                width: '25rem',
                height: '25rem',
                border: '1px solid #797979'
              }}
              src={`${formData.croppedImage}`}
            />
          )}
        </section>
      </section>
    </section>
  )
}

NewPostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { createPost }
)(NewPostForm)
