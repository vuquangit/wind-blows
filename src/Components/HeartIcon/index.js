import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faLike } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faLiked } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import './heart.scss'

const Heart = ({ isLiked = true, size }) => {
  const icon = isLiked ? faLiked : faLike
  const classHeart = classNames({ heart__liked: isLiked })
  const title = isLiked ? 'Unlike' : 'Like'

  const IconSize = size
    ? {
      height: `${size}px`,
      width: 'auto'
    }
    : ''

  return (
    <div className='heart'>
      <div className={classHeart}>
        <FontAwesomeIcon icon={icon} title={title} style={IconSize} />
      </div>
    </div>
  )
}

export default Heart
