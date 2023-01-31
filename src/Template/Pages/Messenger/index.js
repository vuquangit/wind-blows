import React from 'react'
import BasicTemplate from 'Template/BasicTemplate'
import ChatSidebar from './ChatSidebar'
import ChatContent from './ChatContent'
import './messenger.scss'

const Messenger = () => {
  return (
    <BasicTemplate>
      <div className='messenger'>
        <ChatSidebar />
        <ChatContent />
      </div>
    </BasicTemplate>
  )
}

export default Messenger
