import React from 'react'
import './siteName.scss'

const SiteName = ({ size = 24 }) => {
  return (
    <div className='site-name'>
      <h3 className='site-name__text' style={{ fontSize: `${size}px` }}>
        The Wind Blows
      </h3>
    </div>
  )
}

export default SiteName
