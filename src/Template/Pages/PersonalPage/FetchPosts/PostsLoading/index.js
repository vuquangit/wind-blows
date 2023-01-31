import React from 'react'
import Pinwheel from 'Components/Loaders/Pinwheel'
import './postsLoading.scss'

const PostsLoading = () => {
  return (
    <div className='posts-loading'>
      <Pinwheel isLoading size={64} />
      <p>Loading...</p>
    </div>
  )
}

export default PostsLoading
