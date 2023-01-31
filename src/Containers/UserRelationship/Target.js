import React from 'react'
import { Image } from 'cloudinary-react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { isEqual, get } from 'lodash'

import FollowStatus from 'Containers/FollowStatus'

const Target = ({ user = {}, notifications = {}, relationship = {} }) => {
  const viewerId = useSelector((state = {}) =>
    get(state, 'profile.data.user.id', {})
  )
  const { id = '', requestedByViewer = false } = user
  const { typeNotification = 0, media = {} } = notifications
  const isMe = isEqual(id, viewerId)
  const photoPublicId = get(media, 'sidecarChildren[0].public_id', '')
  const postId = get(media, 'id', '')

  return (
    <>
      {typeNotification === 0 || typeNotification === 1
        ? !isMe && (
          <div className='SGI__follow'>
            {!requestedByViewer ? (
              <FollowStatus
                user={user}
                viewerId={viewerId}
                relationship={relationship}
              />
            ) : (
              <Button>Accept</Button>
            )}
          </div>
        )
        : photoPublicId && (
          <div className='SGI__photo'>
            <Link to={`/p/${postId}`} className='SGI__photo--redirect'>
              <Image
                publicId={photoPublicId}
                className='SGI__photo--cloudinary'
              />
            </Link>
          </div>
        )}
    </>
  )
}

export default Target
