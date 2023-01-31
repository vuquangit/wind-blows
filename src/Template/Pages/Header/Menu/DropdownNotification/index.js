import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'antd'
import classNames from 'classnames'

import Notifications from 'Template/Pages/Notifications'
import './dropdown.scss'

const DropdownNotification = ({ count = 0, isScrolled = false }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const classDropNoti = classNames('noti-dropdown__modal', {
    'noti-dropdown-hidden': isScrolled
  })

  return (
    <div className='noti-dropdown'>
      <Badge
        count={count}
        overflowCount={99}
        onClick={() => setIsOpenDropdown(true)}
      >
        <FontAwesomeIcon icon={faBell} title='Notifications' />
      </Badge>
      {isOpenDropdown && (
        <div className={classDropNoti}>
          <div
            className='noti-dropdown__modal--a'
            onClick={() => setIsOpenDropdown(false)}
          />
          <div className='noti-dropdown__modal--b' />
          <div className='noti-dropdown__modal--c' />
          <div className='noti-dropdown__modal--d'>
            <Notifications />
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownNotification
