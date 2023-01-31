import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd'

const TogglePost = ({ isShowOption, handleToggleOption = () => {} }) => {
  return (
    <div className='option__toggle'>
      <Button onClick={handleToggleOption}>
        <FontAwesomeIcon
          icon={isShowOption ? faAngleUp : faAngleDown}
          style={{ fontSize: '24px' }}
        />
      </Button>
    </div>
  )
}

export default TogglePost
