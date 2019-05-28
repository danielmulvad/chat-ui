import React, { useState, useEffect } from 'react'

export default function Home (props) {
  const WebSocket = require('isomorphic-ws')
  const [user, setUserData] = useState()
  const [data, setData] = useState({ messages: [] })
  const [message, setMessage] = useState()
  const ws = new WebSocket('wss://dhm.wtf:51819')
  // Connect to websocket
  useEffect(() => {
    import('../css/home.css')
    var u = JSON.parse(window.localStorage.getItem('user'))
    async function fetchData () {
      await window.fetch(
        'https://dhm.wtf:51819/api/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + u.token
          }
        }
      ).then(res => {
        return res
      }).then(function (eH) {
        return eH.json()
      }).then(function (user) {
        console.log(user)
      }).catch((err) => {
        console.log('ERROR!', err)
      })
    }
    fetchData()
    if (u) {
      ws.onopen = function open () {
        console.log('connected')
      }

      ws.onmessage = function incoming (incomingData) {
        handleRecieved(incomingData.data)
      }

      ws.onclose = function close () {
        console.log('disconnected')
      }
      setUserData(u)
    } // eslint-disable-next-line
  }, [])

  function sendMessage (msg) {
    if (msg && user && user.data.username) {
      ws.send(user.data.username + ': ' + msg)
    }
  }
  function handleRecieved (msg) {
    setData(data => ({ messages: [msg, ...data.messages] }))
  }

  function handleSubmit (e) {
    e.preventDefault()
    sendMessage(message)
  }
  return (
    (user) !== undefined ? (
      <div className='container'>
        <form type='submit'>
          <div className='input-group mb-3'>
            <input onKeyDown={(e) => e.key === 'Enter' ? handleSubmit(e) : null} type='text' className='form-control searchbar' onChange={(e) => setMessage(e.target.value)} placeholder='Type a message here' />
            <div className='btn' id='send-btn' type='submit' onClick={(e) => handleSubmit(e)}>Send</div>
          </div>
          <div className='jumbotron'>
            {data.messages ? data.messages.map((message, index) => {
              return (<div key={index}>{message}</div>)
            }) : null}
          </div>
        </form>
      </div>) : <div>You must log in</div>)
}
