import React, { useState } from 'react'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'

const ToggleSuggested = ({ handleToggleSuggested = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggleIcon = () => {
    handleToggleSuggested()
    setIsOpen(!isOpen)
  }

  return (
    <Button
      onClick={handleToggleIcon}
      className='profile-toggle-suggested-btn'
      style={{
        transform: `rotate(${isOpen ? '-180deg' : '0'})`,
        transition: 'all 0.5s ease'
      }}
    >
      <FontAwesomeIcon icon={faCaretSquareDown} />
    </Button>
  )
}

export default ToggleSuggested
