import React from 'react'
import TimeFromNow from 'Components/TimeFromNow'

const PostedAt = ({ postedAt }) => {
  return (
    <div className='PI__info--posted-at'>
      <TimeFromNow postedAt={postedAt} />
    </div>
  )
}

export default PostedAt
