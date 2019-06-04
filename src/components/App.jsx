import React, { useEffect, useState } from 'react'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
const defaultAvatar = 'data:image/jpeg;base64,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'

export default function App () {
  const [ready, isReady] = useState(false)
  const user = window.localStorage.getItem('user')

  useEffect(() => {
    isReady(user)
  }, [])

  function handleLogout () {
    window.localStorage.clear()
    window.location = '/'
  }
  return (
    <Router>
      <div>
        <div className='row' style={{ height: '100vh', margin: 0 }}>
          <div className='dock'>
            {ready
              ? (
                <div>
                  <div className='btn-group dropright'>
                    <div type='button' data-toggle='dropdown' >
                      <img className='avatar' alt='avatar' src={defaultAvatar} />
                    </div>
                    <div className='dropdown-menu' id='avatar-menu' aria-labelledby='dropdownMenuButton'>
                      <div className='dropdown-item' type='button' id='logout' onClick={() => handleLogout()}>Logout</div>
                      <div className='dropdown-item' type='button' id='change-avatar'>Change Avatar</div>
                    </div>
                  </div>
                  <div />
                </div>
              )
              : (
                <div>
                  <Link onClick={() => { console.log(ready) }} className='link' to='/'><i className='fas fa-sign-in-alt' /></Link>
                </div>
              )}
          </div>
          <div className='col'>
            <div className='container'>
              {
                ready ? (
                  <Switch>
                    <Route path='/' render={() => <Home ready={ready} />} exact />
                    <Route path='/register' render={() => <Register />} exact />
                    <Route path='/404' render={() => <Home />} exact />
                  </Switch>
                ) : (
                  <Switch>
                    <Route path='/' render={() => <Login />} exact />
                    <Route path='/register' render={() => <Register />} exact />
                  </Switch>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}
