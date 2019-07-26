import React, { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Messages = ({ chat: { messages } }) => {
  const scroll = useRef(null)

  // let bottom

  // const handleScroll = e => {
  //     bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
  //     if (bottom) {
  //         bottom = true
  //         console.log('bottom')
  //     }
  // }

  useEffect(() => {
    if (scroll) {
      scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return messages ? (
    // <section className='messages'>
    <div className='messages'>
      {/* <ul className="messages" onScroll={handleScroll}></ul> */}
      {messages.map(message => (
        <div key={message._id}>
          <span className='nickname'>{message.user.name}</span> {message.text}
        </div>
      ))}
      <div ref={scroll} />
    </div>
  ) : (
    // </section>
    <Fragment>Loading</Fragment>
  )
}

Messages.propTypes = {
  chat: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  chat: state.chat.chat
})

export default connect(
  mapStateToProps,
  {}
)(Messages)
