import React, { useState, useEffect } from 'react'
const WebSocket = require('isomorphic-ws')
const ws = new WebSocket('wss://dhm.wtf:51819')

export default function Home (props) {
  const [data, setData] = useState({ messages: [] })
  const [userData, setUserData] = useState()
  const [ready, isReady] = useState(false)
  const [message, setMessage] = useState()

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
        setUserData(user)
        isReady(true)
      }).catch((err) => {
        console.log('ERROR!', err)
      })
    }
    fetchData()
    ws.onopen = function open () {
      console.log('connected')
    }

    ws.onclose = function close () {
      console.log('disconnected')
    }

    ws.onmessage = function incoming (data) {
      handleRecieved(data.data)
    }
    // eslint-disable-next-line
  }, [])

  function sendMessage (msg) {
    if (msg) {
      ws.send(userData.data[0].username + ': ' + msg)
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
    ready ? (
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
