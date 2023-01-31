import React from 'react'
import { Link } from 'react-router-dom'

import SiteName from 'Components/SiteName'
import Registration from './Registration'
import Authorization from 'Containers/Authorization'

const EmailSignup = () => {
  return (
    <div className='signup'>
      <div className='signup__content'>
        <div className='signup__sign'>
          <div className='signup__sign--content'>
            <div className='form'>
              <div className='form--header'>
                <SiteName />
              </div>
              <div className='form--content'>
                <h2 className='description'>
                  Sign up to see photos and videos from your friends.
                </h2>
                <Authorization />
                <div className='divide'>
                  <div className='divide__line' />
                  <div className='divide__text'>or</div>
                  <div className='divide__line' />
                </div>
                <Registration />
              </div>
            </div>
            <div className='switch-sign'>
              <p className='switch-sign--text'>
                Have a account?
                <Link to='/accounts/login'>
                  <button className='switch-btn'>Log in</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailSignup
