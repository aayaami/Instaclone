import React, { Fragment } from 'react'
import spinner from './spinner.gif'

export default () => (
  <section className='content'>
    <section className='profile-wrapper'>
      <section className='profile-header'>
        <img
          src={spinner}
          style={{ width: '200px', margin: 'auto', display: 'block' }}
          alt='Loading...'
        />
      </section>
    </section>
  </section>
)
