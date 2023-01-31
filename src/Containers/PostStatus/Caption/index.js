import React from 'react'
import { Input } from 'antd'
import { useSelector } from 'react-redux'

import AvatarUser from 'Components/AvatarUser'
import Emoji from 'Containers/Emoji'

const PostCaption = ({ caption = '', setStatus }) => {
  const { profilePictureUrl = '', profilePicturePublicId = '' } = useSelector(
    (state = {}) => state.profile.data.user
  )

  const handleInputChanged = e => {
    // console.log(e.target.value);
    e.persist()
    setStatus(prevState => ({ ...prevState, caption: e.target.value }))
  }

  const onSelectEmoji = emoji =>
    setStatus(prevState => ({
      ...prevState,
      caption: prevState.caption + emoji.native
    }))

  return (
    <div className='post-status__content--caption'>
      <div className='caption-avatar'>
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={40}
        />
      </div>
      <div className='caption-content'>
        <Input.TextArea
          placeholder='Caption...'
          autoSize={{ minRows: 2, maxRows: 4 }}
          allowClear
          onChange={handleInputChanged}
          value={caption}
          className='caption-content__input'
        />
        <div className='caption-content__advance'>
          <Emoji onSelect={onSelectEmoji} />
        </div>
      </div>
    </div>
  )
}

export default PostCaption
