import React from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'

import AvatarUser from 'Components/AvatarUser'

const ContentHeader = () => {
  const {
    username = '',
    profilePictureUrl = '',
    profilePicturePublicId = ''
  } = useSelector((state = {}) => get(state, 'profile.data.user'))

  return (
    <div className='chat-content__header'>
      <div className='chat-content__header--avatar'>
        <AvatarUser
          profilePictureUrl={profilePictureUrl}
          profilePicturePublicId={profilePicturePublicId}
          size={32}
        />
      </div>
      <h2 className='chat-content__header--username'>{username}</h2>
    </div>
  )
}

export default ContentHeader
