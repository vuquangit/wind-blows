import React, { memo } from 'react'
import { Button, Popover } from 'antd'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import emojiImage from 'assets/images/emoji__4Z_KKMxKl4H.png'
import './emoji.scss'

const Emoji = ({ onSelect = () => {}, style = {} }) => {
  const emojiPicker = (
    <Picker
      title='Pick your emoji…'
      emoji='point_up'
      style={{
        ...style
      }}
      onSelect={onSelect}
      showPreview={false}
      showSkinTones={false}
    />
  )

  return (
    <>
      <Popover
        content={emojiPicker}
        title={null}
        trigger='click'
        overlayClassName='emoij-popover'
      >
        <Button className='emoji' title='Insert emoji'>
          <div
            className='emoji-icon'
            style={{ backgroundImage: `url(${emojiImage})` }}
          />
        </Button>
      </Popover>
    </>
  )
}

export default memo(Emoji)
