import React from 'react'
import BasicTemplate from 'Template/BasicTemplate'
import UpdatePassword from '../Update'
import './reset.scss'

const Reset = () => {
  return (
    <BasicTemplate>
      <div className='reset-password'>
        <div className='reset-password__content'>
          <div className='reset-password__content--header'>
            <h1>Create new password</h1>
          </div>
          <UpdatePassword isResetPassword />
        </div>
      </div>
    </BasicTemplate>
  )
}

export default Reset
