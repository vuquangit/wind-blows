import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import classNames from 'classnames'

import AvatarUser from 'Components/AvatarUser'

const ResultItem = ({
  username = '',
  isVerified = false,
  profilePictureUrl = '',
  profilePicturePublicId = '',
  subTitle = ' • Following',
  isTagPeople = false,
  handleSelectSearchItem = () => {}
}) => {
  const _subTitle = isTagPeople
    ? subTitle.replace(' • Following', '')
    : subTitle

  const classItem = classNames('search-people__item', {
    'search-people__item-tag-people': isTagPeople
  })

  const _renderItem = () => (
    <>
      <div className='result__avatar'>
        <AvatarUser
          profilePicturePublicId={profilePicturePublicId}
          profilePictureUrl={profilePictureUrl}
          size={isTagPeople ? 30 : 44}
        />
      </div>
      <div className='result__description'>
        <div className='result__description--username'>
          {username}
          {isVerified && (
            <span
              className=' sprite-icon__core verified__small'
              title='Verified'
            >
              Verified
            </span>
          )}
        </div>
        <div className='result__description--fullName'>{_subTitle}</div>
      </div>
    </>
  )

  return (
    <>
      {isTagPeople ? (
        <Button
          onClick={() => handleSelectSearchItem(username)}
          className={classItem}
        >
          {_renderItem()}
        </Button>
      ) : (
        <Link to={`/${username}/`} title={username} className={classItem}>
          {_renderItem()}
        </Link>
      )}
    </>
  )
}

export default ResultItem
