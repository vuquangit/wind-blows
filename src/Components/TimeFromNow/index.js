import React from 'react'
import moment from 'moment'
import './timeFromNow.scss'

const PostTimeAgo = ({ postedAt, className = '' }) => {
  const _timeAgo = moment(
    parseInt(
      postedAt +
        (postedAt.toString().length <= 13
          ? '0'.repeat(13 - postedAt.toString().length)
          : '')
    )
  ).fromNow()

  return <div className={`time-from-now ${className}`}>{_timeAgo}</div>
}

export default PostTimeAgo
