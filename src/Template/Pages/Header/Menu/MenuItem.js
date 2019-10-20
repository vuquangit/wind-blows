import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MenuItem = ({ icon = '', title = '', href = '' }) => {
  return (
    <NavLink to={href}>
      <div className='menu-item'>
        <FontAwesomeIcon icon={icon} title={title} />
      </div>
    </NavLink>
  )
}

export default MenuItem
