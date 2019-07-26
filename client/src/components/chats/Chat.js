import React, { useEffect, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import { getChat, clearChat, refreshMessages } from '../../actions/chat'
import { connect } from 'react-redux'
import Messages from './Messages'
import MessageForm from './MessageForm'
import { loadUser } from '../../actions/auth'
import Spinner from '../layout/Spinner'

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

const Chat = ({
  auth: { user },
  match,
  chat: { chat, loading },
  getChat,
  clearChat,
  socket: { socket, socketLoading },
  refreshMessages,
  loadUser
}) => {
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  useEffect(() => {
    getChat(match.params.id)
    loadUser()
    return () => {
      // clearChat()
    }
  }, [getChat])

  useEffect(() => {
    if (!loading && socket) {
      if (chat) {
        socket.emit('join chat', chat._id)
      }
    }
    return () => {
      if (socket && chat) {
        socket.emit('leave chat', chat._id)
        clearChat()
      }
    }
  }, [socketLoading, loading])

  useEffect(() => {
    if (socket) {
      socket.on('refresh messages', () => {
        console.log('ref')
        refreshMessages(match.params.id)
      })
    }
  }, [socketLoading])

  if (!loading && !socketLoading && user) {
    return (
      <Fragment>
        <section className='content'>
          <Messages messages={chat.messages} />
          <MessageForm
            userId={user._id}
            userChatId={chat._id}
            userName={user.name}
            chatId={match.params.id}
          />
        </section>
      </Fragment>
    )
  } else {
    return <Spinner />
  }
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  getChat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearChat: PropTypes.func.isRequired,
  refreshMessages: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth,
  socket: state.socket
})

export default connect(
  mapStateToProps,
  { getChat, clearChat, refreshMessages, loadUser }
)(Chat)
