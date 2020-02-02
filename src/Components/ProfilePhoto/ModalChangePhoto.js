import React, { useState } from 'react'
import { Modal, Button, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { get } from 'lodash'

import { updateProfileInfo } from 'Redux/Profile/profile.action'
import IsLoading from 'Components/IsLoading'

const toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = event => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        // Landscape: 1080x608
        // Square: 1080x1080
        // Portait: 1080x1350
        const width = img.width > 1080 ? 1080 : img.width
        const elem = document.createElement('canvas')
        const scaleFactor = width / img.width
        elem.width = width
        elem.height = img.height * scaleFactor

        const ctx = elem.getContext('2d')
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
        const type = 'image/jpeg'

        resolve({ data: ctx.canvas.toDataURL(type, 1), type })
      }
    }

    reader.onerror = error => {
      reject(error)
    }
  })
}

const ModalChangePhoto = ({ visibleModal, handleCancelModal }) => {
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const {
    id: userId = '',
    email = '',
    profilePictureUrl: profilePictureUrlBefore = ''
  } = useSelector(state => get(state, 'profile.data.user'))
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || ''
  const keyMessage = 'updatable'

  const fetchUploadPhoto = async event => {
    message.loading({ content: 'Please wait...', key: keyMessage })

    const filesSeleted = Array.from(event.target.files)
    const getDataImages = filesSeleted.map(async file => {
      const { data, type } = await toBase64(file)
      return {
        name: file.name,
        type: type,
        base64: data
      }
    })

    Promise.all(getDataImages).then(async data => {
      setUpdating(true)
      // upload image
      try {
        const res = await Axios.post(`${SERVER_BASE_URL}/upload-image/upload`, {
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        await fetchChangePhoto(get(res, 'data[0].url'))
      } catch (err) {
        message.error({ content: `Error: ${err}`, key: keyMessage })
        console.log(err)
      } finally {
        setUpdating(false)
      }
    })
  }

  const fetchChangePhoto = async profilePictureUrl => {
    console.log('profilePictureUrl', profilePictureUrl)

    setUpdating(true)
    // message.loading({
    //   content: "Changing your profile photo...",
    //   key: keyMessage
    // });

    try {
      // change profile photo
      await Axios({
        method: 'post',
        url: `${SERVER_BASE_URL}/users/change-profile-photo`,
        data: { userId, profilePictureUrl },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // delete old profile photo ???
      if (profilePictureUrlBefore && profilePictureUrlBefore.length > 2) {
        const publicId = profilePictureUrlBefore.substring(
          profilePictureUrlBefore.lastIndexOf('/') + 1,
          profilePictureUrlBefore.lastIndexOf('.')
        )

        try {
          await Axios({
            method: 'POST',
            url: `${SERVER_BASE_URL}/upload-image/delete`,
            data: {
              publicId
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          message.success({ content: 'Deleted old profile photo', keyMessage })
        } catch (err) {
          message.error({ content: `Error: ${err}`, key: keyMessage })
          console.log(err)
        }
      }

      // fetch personal post data
      const data = { email: email }
      await dispatch(updateProfileInfo({ data, endpoint: 'auth/me' }))
      message.success({
        content: 'Updated your profile photo',
        keyMessage,
        duration: 3
      })
    } catch (err) {
      message.error({ content: `Error: ${err}`, key: keyMessage })
      console.log(err)
    } finally {
      setUpdating(false)
      handleCancelModal()
    }
  }

  const handleSelectPhoto = () => {
    document.getElementById('selectImage').click()
  }

  const handleRemoveImage = () => {
    message.loading({ content: 'Please wait...', key: keyMessage })
    fetchChangePhoto(null)
  }

  return (
    <Modal
      title='Change Profile Photo'
      visible={visibleModal}
      onCancel={!updating ? handleCancelModal : () => {}}
      className='profile-photo__modal'
      footer={null}
      closable={false}
      centered
    >
      {updating && (
        <div className='profile-photo__modal--loading'>
          <div className='loading-content'>
            <IsLoading isLoading size={64} />
          </div>
        </div>
      )}
      <div className='profile-photo__modal--content'>
        <Button
          className='modal-btn btn-upload'
          onClick={() => handleSelectPhoto()}
        >
          Upload Photo
        </Button>
        <Button
          className='modal-btn btn-remove'
          onClick={() => handleRemoveImage()}
        >
          Remove Current Photo
        </Button>
        <Button className='modal-btn btn-cancel' onClick={handleCancelModal}>
          Cancel
        </Button>
        <input
          id='selectImage'
          accept='image/jpeg,image/png'
          type='file'
          className='input-upload-image'
          onChange={e => fetchUploadPhoto(e)}
        />
      </div>
    </Modal>
  )
}

export default ModalChangePhoto
