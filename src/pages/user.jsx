import React, { useEffect, useState } from 'react'

export default function User (props) {
  const [data, setData] = useState()
  const [ready, isReady] = useState(false)

  useEffect(() => {
    import('../css/user.css')
    const name = decodeURI(window.location.pathname.slice(6))
    async function fetchData () {
      await window.fetch(
        'https://dhm.wtf:51819/api/user/' + name,
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
        console.log(user.data[0])
      }).catch((err) => {
        console.log('ERROR!', err)
      })
    }
    fetchData() // eslint-disable-next-line
  }, [])

  async function getBase64FromFile (file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        return resolve(reader.result)
      }
      reader.onerror = error => reject(error)
    })
  }

  function handleFiles (files) {
    var allFiles = document.getElementById('changePhotoModal-hidden-upload').files
    if (allFiles[0] && allFiles[0].name.match('(.jpg|.png|.bmp|.jpeg)$') !== null) {
      getBase64FromFile(allFiles[0]).then((b64) => {
        document.getElementById('changePhotoModal-cancel-button').click()
        var token = JSON.parse(window.localStorage.getItem('user')).data.token
        window.fetch(
          'https://dhm.wtf:51819/api/user/' + data.username,
          {
            method: 'POST',
            body: JSON.stringify({ ...data, avatar: b64 }),
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }
        ).then(() => {
          window.location.reload()
        }).catch((err) => {
          console.log('ERROR!', err)
        })
      })
    }
  }

  return ready ? (
    <div className='row' id='user-container'>
      <div className='col-md-6' id='leftColumn'>
        <div className='row'>
          <div type='button' data-toggle='modal' data-target={'#changePhotoModal'}>
            <img src={data.avatar} alt='img' id='profile-picture' />
          </div>
          <div className='col' id='name-container'>
            <h4>
              {data.firstname + ' ' + data.lastname}
              <hr />
            </h4>
          </div>
        </div>
        <div className='modal fade' id='changePhotoModal' tabIndex='-1' role='dialog' aria-labelledby='changePhotoModal' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <form >
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='changePhotoModal-title'>Upload your profile photo</h5>
                </div>
                <div className='modal-body'>
                  <div className='row'>
                    <div className='col-md-3'>
                      <i id='changePhotoModal-icon' className='fas fa-6x fa-user-circle' />
                    </div>
                    <div className='col' id='changePhotoModal-text'>
                      <span>Browse to locate your profile photo image. You can upload a .jpg, .png, or .bmp file.</span>
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <input id='changePhotoModal-hidden-upload' type='file' onChange={(e) => handleFiles(e)} />
                  <div type='button' onClick={() => document.getElementById('changePhotoModal-hidden-upload').click()} id='changePhotoModal-upload-button' className='btn'>Upload</div>
                  <div type='button' id='changePhotoModal-cancel-button' className='btn' data-dismiss='modal'>Cancel</div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <table className='table table-striped' id='user-details'>
          <tbody>
            <tr />
          </tbody>
        </table>
      </div>
    </div>
  ) : null
}
