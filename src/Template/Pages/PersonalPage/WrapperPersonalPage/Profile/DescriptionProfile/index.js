import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { get, isEqual } from 'lodash'

const Description = () => {
  const { bio = '', fullName = '', website = '' } = useSelector(
    (state = {}) => get(state, 'personalProfile.data.user', {}),
    isEqual()
  )

  const _bio = bio.split('\n').map((item, key) => {
    return (
      <Fragment key={key}>
        {item}
        <br />
      </Fragment>
    )
  })

  return (
    <div className='profile-description'>
      <h1 className='description-name'>{fullName}</h1>
      <span className='description-bio'>{_bio}</span>
      {website && (
        <a
          href={website}
          target='_blank'
          rel='noopener noreferrer'
          className='description-website'
        >
          {website}
        </a>
      )}
    </div>
  )
}

export default Description
