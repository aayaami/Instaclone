import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts/globalfeed'>Global Feed</Link>
      </li>
      <li>
        <Link to='/posts/feed'>Feed</Link>
      </li>
      {user ? (
        <li>
          <Link to={`/users/${user._id}`}>My Profile</Link>
        </li>
      ) : null}

      <li>
        <Link to='/posts/create'>Create Post</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  )
  return (
    <nav className='header navbar'>
      <h1>
        <Link to='/'>Instaclone</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)
