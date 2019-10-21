import React from 'react'
import Profile from './Profile'
import Highlights from './Highlights'
import TabControl from './TabControl'
import './personalPage.scss'

const PersonalPage = () => {
  return (
    <div className='personal'>
      <Profile />
      <Highlights />
      <TabControl />
    </div>
  )
}

export default PersonalPage
