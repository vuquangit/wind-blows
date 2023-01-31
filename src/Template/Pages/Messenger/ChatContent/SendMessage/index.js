import React from 'react'
import { Input, Button } from 'antd'

const SendMessage = () => {
  return (
    <div className='chat-content__send-message'>
      <Input.TextArea placeholder='Enrer message...' />
      <Button>Send</Button>
    </div>
  )
}

export default SendMessage
