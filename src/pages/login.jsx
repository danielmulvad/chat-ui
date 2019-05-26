import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Login () {
  const [ data, setData ] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    import('../css/login.css')
  }, [])

  async function handleSubmit (event) {
    var success
    event.preventDefault()
    const body = { username: username, password: password }
    await window.fetch('http://localhost:51819/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (response) {
      if (response.status === 200) {
        success = true
      }
      return response.json()
    }).then(function (eH) {
      if (success === true) {
        setData(eH)
        window.localStorage.setItem('user', JSON.stringify(eH))
      }
    }).then(() => { window.location = '/' }).catch((err) => {
      console.log('ERROR!', err)
    })
  }

  return (
    <div className='loginContainer'>
      <div className='row'>
        <div className='col-sm-3' />
        <div className='col-sm-6'>
          <h4>
            <b>Log in to your account</b>
          </h4>
          <div className='forgot'>
            <Link to='/forgot' className='link forgot'>
            Forgot your username or password?
            </Link>
          </div>
          <form onSubmit={e => handleSubmit(e)} id='loginForm'>
            <div className='form-group'>
              <input
                data-testid='usernameInput'
                className='col-md-12 form-control login-input'
                id='username'
                onChange={e => {
                  setUsername(e.target.value)
                }}
                onClick={() => console.log(data)}
                placeholder='User Name'
                autoFocus='autoFocus'
                type='username'
                autoComplete='username'
                required
              />
            </div>
            <div className='form-group'>
              <input
                data-testid='passwordInput'
                className='col-md-4 form-control login-input'
                id='password'
                onChange={e => {
                  setPassword(e.target.value)
                }}
                placeholder='Password'
                type='password'
                autoComplete='current-password'
                required
              />
            </div>
            <div type='submit' onClick={(e) => handleSubmit(e)} className='loginButton btn col-md-12'>
              Log In
            </div>
            <div type='button' className='loginButton btn col-md-12'>
              <Link className='link' id='register-link' to='/register'>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
