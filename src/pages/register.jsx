import React, { useEffect, useState } from 'react'

function Register () {
  const [input, setInput] = useState()
  useEffect(() => {
    import('../css/register.css')
  }, [])
  function capitalize (s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  async function handleSubmit (event) {
    event.preventDefault()
    if (input && input.firstname && input.lastname && input.username && input.password && input.confirmPassword) {
      input.firstname = capitalize(input.firstname)
      input.lastname = capitalize(input.lastname)
      await window.fetch(
        'https://dhm.wtf/api/user/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: input.firstname,
            lastname: input.lastname,
            username: input.username,
            password: input.password
          })
        }
      ).then(res => {
        return res
      }).then(function (eH) {
        console.log(eH)
        if (eH.status === 200) {
          window.location = '/'
        }
      }).catch((err) => {
        console.log('ERROR!', err)
      })
    }
  }

  return (
    <div className='registerContainer'>
      <div className='row'>
        <div className='col-sm-3' />
        <div className='col-sm'>
          <h4>
            <b>Register an account</b>
          </h4>
          <form onSubmit={e => handleSubmit(e)} id='registerForm'>
            <div className='form-group'>
              <div className='row'>
                <input
                  className='col-sm-5 form-control register-input'
                  id='firstname'
                  onChange={e => {
                    setInput({ ...input, firstname: e.target.value })
                  }}
                  placeholder='First Name'
                  autoFocus='autoFocus'
                  type='username'
                  autoComplete='username'
                  required
                />
                <input
                  className='col-sm-5 form-control register-input'
                  id='lastname'
                  onChange={e => {
                    setInput({ ...input, lastname: e.target.value })
                  }}
                  placeholder='Last Name'
                  autoFocus='autoFocus'
                  type='username'
                  autoComplete='username'
                  required
                />
                <input
                  className='col-md-11 form-control register-input'
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
                <input
                  className='col-md-5 form-control register-input'
                  id='password'
                  onChange={e => {
                    setInput({ ...input, password: e.target.value })
                  }}
                  placeholder='Password'
                  type='password'
                  autoComplete='new-password'
                  required
                />
                <input
                  className='col-md-5 form-control register-input'
                  id='confirmPassword'
                  onChange={e => {
                    setInput({ ...input, confirmPassword: e.target.value })
                  }}
                  placeholder='Confirm Password'
                  type='password'
                  autoComplete='new-password'
                  required
                />
                <button type='submit' onClick={e => handleSubmit(e)} className='registerButton btn col-md-10 offset-md-1'>
              Register
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-sm-3' />
      </div>
    </div>
  )
}
export default Register
