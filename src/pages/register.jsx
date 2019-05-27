import React, { useEffect, useState } from 'react'

function Register () {
  const [input, setInput] = useState()
  useEffect(() => {
    import('../css/register.css')
  }, [])

  async function handleSubmit (event) {
    try {
      event.preventDefault()
      var username = input.username
      await window.fetch(
        'https://dhm.wtf:51819/api/user/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: input.password })
        }
      ).then(res => {
        return res
      }).then(function (eH) {
        console.log(eH)
        if (eH.status === 200) {
          window.location = '/login'
        }
      }).catch((err) => {
        console.log('ERROR!', err)
      })
    } catch (err) {
      console.log('ERROR!', err)
    }
  }

  return (
    <div className='registerContainer'>
      <div className='row'>
        <div className='col-sm-3' />
        <div className='col-sm-6'>
          <h4>
            <b>Register an account</b>
          </h4>
          <form onSubmit={e => handleSubmit(e)} id='registerForm'>
            <div className='form-group'>
              <input
                className='col-md-12 form-control register-input'
                id='username'
                onChange={e => {
                  setInput({ ...input, username: e.target.value })
                }}
                placeholder='User Name'
                autoFocus='autoFocus'
                type='username'
                autoComplete='username'
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='col-md-4 form-control register-input'
                id='password'
                onChange={e => {
                  setInput({ ...input, password: e.target.value })
                }}
                placeholder='Password'
                type='password'
                autoComplete='new-password'
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='col-md-4 form-control register-input'
                id='confirmPassword'
                onChange={e => {
                  setInput({ ...input, confirmPassword: e.target.value })
                }}
                placeholder='Confirm Password'
                type='password'
                autoComplete='new-password'
                required
              />
            </div>
            <button type='submit' onClick={e => handleSubmit(e)} className='registerButton btn col-md-12'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register
