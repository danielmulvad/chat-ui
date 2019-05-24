import React, { useState, useEffect, useGlobal } from 'reactn'

export default function Home (props) {
  const WebSocket = require('isomorphic-ws')
  const [data, setData] = useGlobal()
  const [message, setMessage] = useState()
  var ws
  useEffect(() => {
    import('../css/home.css')
    if (data.authenticated) {
      ws = new WebSocket('ws://localhost:8080')
      ws.onopen = function open () {
        console.log('connected')
        ws.send(data.data.username + ': connected')
      }

      ws.onmessage = function incoming (incomingData) {
        console.log(data)
        console.log(incomingData)
      }
      ws.onclose = function close () {
        console.log('disconnected')
      }
    }
  }, [])

  function handleSubmit (e) {
    e.preventDefault()
    ws.send(message)
  }
  return (
    <div className='container'>
      <form type='submit' onSubmit={(e) => handleSubmit(e)}>
        <input type='text' onClick={() => console.log(data)} placeholder='input message to send' onChange={(e) => setMessage(e.target.value)} />
        <button type='submit' onClick={e => handleSubmit(e)}>Send</button>
        <div />
      </form>
    </div>)
}
