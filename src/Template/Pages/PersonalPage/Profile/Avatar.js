import React from 'react';

const Avatar = () => {
  return (
    <div className='personal__header--avatar'>
      <div className='avatar-layer1'>
        <div className='avatar-layer2'>
          <button className='avatar-button' title='Change Profile Photo'>
            {/* eslint-disable-next-line */}
            <img
              className='avatar-image'
              src='https://live.staticflickr.com/65535/49150573271_52eb21ac75_z.jpg'
              alt='Change Profile Photo'
            />
          </button>
        </div>
      </div>
    </div>
  )
};

export default Avatar
