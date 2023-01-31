import React from 'react'
import BasicTemplate from 'Template/BasicTemplate'
import WrapperMenuAccounts from '../WrapperMenuAccount'
import PrivacyAndSecurity from './PrivacyAndSecurity'
import './privacyAndSecurity.scss'

const index = () => {
  return (
    <BasicTemplate>
      <WrapperMenuAccounts>
        <PrivacyAndSecurity />
      </WrapperMenuAccounts>
    </BasicTemplate>
  )
}

export default index
