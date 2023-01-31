import React from 'react'
import ContentHeader from './ContentHeader'
import ContentMessage from './ContentMessage'
import SendMessage from './SendMessage'

const ChatContent = () => {
  return (
    <div className='chat-content'>
      <ContentHeader />
      <ContentMessage />
      <SendMessage />
    </div>
  )
}

export default ChatContent
