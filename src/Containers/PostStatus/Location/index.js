import React from 'react'
import { Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const PostLocation = ({ location = '', setStatus }) => {
  const handleChanged = e => {
    // e.persist();
    const nameLocation = e.target !== null ? e.target.value : ''

    setStatus(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        name: nameLocation
      }
    }))
  }

  return (
    <div className='post-status__content--location'>
      <FontAwesomeIcon icon={faMapMarkerAlt} className='location__icon' />
      <Input
        placeholder='Location'
        value={location}
        onChange={e => handleChanged(e)}
      />
    </div>
  )
}

export default PostLocation
