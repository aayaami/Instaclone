import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords should match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isAuthenticated) {
    return <Redirect to='/posts/feed' />
  }

  const { name, email, password, password2 } = formData

  return (
    <section className='content'>
      <form
        onSubmit={e => handleSubmit(e)}
        className='message-form login-register'
      >
        <h1>Register</h1>
        <div>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Name'
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => handleChange(e)}
            required
            minLength='6'
          />
        </div>
        <div>
          <input
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={e => handleChange(e)}
            required
            minLength='6'
          />
        </div>
        <div>
          <button type='submit' className='btn-action'>
            Register
          </button>
        </div>
      </form>
    </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register)
