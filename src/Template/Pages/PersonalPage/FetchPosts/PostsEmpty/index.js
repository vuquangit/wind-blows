import React from 'react'
import './personalPost.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostEmpty = ({ icon, text }) => {
  return (
    <div className='personal-post__no-post'>
      <div className='personal-post__no-post--content'>
        <div className='personal-post__no-post--icon'>
          <FontAwesomeIcon icon={icon} style={{ fontSize: '28px' }} />
        </div>
        <h1 className='personal-post__no-post--text'>{text}</h1>
      </div>
    </div>
  )
}

export default PostEmpty
