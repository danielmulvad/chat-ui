import React, { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'

export default function App () {
  const [opened, isOpen] = useState(false)
  return (
    <Router>
      <div>
        <div className='row' style={{ height: '100vh', margin: 0 }}>
          <div className='dock'>
            <div type='button' onClick={() => opened ? isOpen(false) : isOpen(true)}>Open</div>
            <div type='button'><Link className='link' to='/'>Home</Link></div>
            <div type='button'><Link className='link' to='/login/'>Login</Link></div>
            <div type='button'><Link className='link' to='/register/'>Register</Link></div>
          </div>
          <div className='col'>
            <Sidebar
              children={''}
              shadow={false}
              sidebar={<div className='container-fluid'><b>Sidebar content</b><hr /></div>}
              open={opened}
              defaultSidebarWidth={300}
              styles={{ root: { pointerEvents: 'none' },
                sidebar: { position: 'relative', width: '300px', height: '100vh', background: 'white', paddingTop: '20px', pointerEvents: 'none' },
                overlay: { zIndex: -1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'none',
                  pointerEvents: 'none',
                  transition: 'opacity .3s ease-out, visibility .3s ease-out',
                  backgroundColor: 'rgba(0,0,0,0.0)'
                } }}
            />
            <div className='container'>
              <Switch>
                <Route path='/' render={() => <Home />} exact />
                <Route path='/login' render={() => <Login />} exact />
                <Route path='/register' render={() => <Register />} exact />
                <Route path='/404' render={() => <Home />} exact />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}
