import React from 'react'

const SliderItem = ({title='', thumbnailUrl=''}) => {
  return( 
    <div className='personal__highlight--item'>
      {/* <canvas height='128' width='128' className='circle-border' /> */}
      <div className='thumbnail'>
        <div className='thumbnail-url' style={{backgroundImage: `url(${thumbnailUrl})`}} />
      </div>
      <div className='title'>{title}</div>
    </div>
  )
}

export default SliderItem
