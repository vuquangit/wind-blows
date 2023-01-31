import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const EditProfile = () => {
  return (
    <Link
      to='/accounts/edit/'
      className='profile-edit-profile'
      title='Edit Profile'
    >
      <Button>Edit Profile</Button>
    </Link>
  )
}

export default EditProfile
