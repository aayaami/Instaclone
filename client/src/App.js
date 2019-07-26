import React, { Fragment, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import PrivateRoute from './components/routing/PrivateRoute'
import WebSocketIo from './utils/WebSocketIo'
import Posts from './components/posts/Posts'
import NewPostForm from './components/posts/NewPostForm'
import Post from './components/post/Post'
import UserProfile from './components/users/UserProfile'
import PostsFeed from './components/posts/PostsFeed'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <WebSocketIo />
          <section className='grid-wrapper'>
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute path='/users/:id' component={UserProfile} />
              <PrivateRoute path='/posts/create' component={NewPostForm} />
              <PrivateRoute path='/posts/feed' component={PostsFeed} />
              <PrivateRoute exact path='/posts/globalfeed' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
