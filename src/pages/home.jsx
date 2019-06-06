import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
const WebSocket = require('isomorphic-ws')
const u = JSON.parse(window.localStorage.getItem('user'))
const ws = new WebSocket('wss://dhm.wtf:51819')

export default function Home (props) {
  const [data, setData] = useState({ messages: [] })
  const [message, setMessage] = useState()
  const [ready, isReady] = useState(false)

  // Connect to websocket
  useEffect(() => {
    import('../css/home.css')
    isReady(props.ready)
    ws.onopen = function open () {
      sendMessage('connected')
    }

    ws.onmessage = function incoming (data) {
      handleRecieved(data.data)
    }

    ws.onclose = function close () {
      console.log('disconnected')
    }

    // eslint-disable-next-line
  }, [])

  async function authenticate (callback) {
    await window.fetch(
      'https://dhm.wtf/api/token',
      {
        body: JSON.stringify(u.data),
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + u.data.token,
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      console.log(res)
      if (res.status === 200) {
        callback()
      }
    }).catch((err) => {
      console.log('ERROR!', err)
    })
  }

  async function sendMessage (msg) {
    if (msg) {
      await authenticate(() => {
        ws.send(u.data.username + ': ' + msg)
      })
    }
  }
  function handleRecieved (msg) {
    setData(data => ({ messages: [ msg, ...data.messages ] }))
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

Home.propTypes = {
  ready: PropTypes.bool.isRequired
}
