import React, { useEffect, useState } from 'react'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import User from '../pages/user'
import Register from '../pages/register'

export default function App () {
  const [data, setData] = useState()
  const [ready, isReady] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('user'))

  useEffect(() => {
    async function fetchData () {
      await window.fetch(
        'https://dhm.wtf/api/user/' + user.data.username,
        {
          method: 'GET'
        }
      ).then(res => {
        return res
      }).then(function (eH) {
        return eH.json()
      }).then(function (user) {
        if (user.data.length <= 0) {
          isReady(false)
          return
        }
        setData(user.data[0])
        isReady(true)
      }).catch((err) => {
        console.log('ERROR!', err)
      })
    }
    if (user) {
      fetchData()
    } // eslint-disable-next-line
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
                      <img className='avatar' alt='avatar' src={data.avatar || null} />
                    </div>
                    <div className='dropdown-menu' id='avatar-menu' aria-labelledby='dropdownMenuButton'>
                      <Link className='link dropdown-item' id='profile-link' to={'/'}>Home</Link>
                      <Link className='link dropdown-item' id='profile-link' to={'/user/' + user.data.username}>Profile</Link>
                      <div className='dropdown-item' type='button' id='logout' onClick={() => handleLogout()}>Logout</div>
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
                    <Route path='/user/:id' render={() => <User user={user.data} />} exact />
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
