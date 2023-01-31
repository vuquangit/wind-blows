import React from 'react'
import Slider from 'react-slick'
import { isEmpty } from 'lodash'
import { settings } from './configHighlight'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SliderItem from './SliderItem'
import reels from './reels.json'

const Highlights = () => {
  return (
    !isEmpty(reels) && (
      <div className='personal__highlight'>
        <Slider {...settings}>
          {reels.map((item, idx) => (
            <SliderItem key={item._id || idx} {...item} />
          ))}
        </Slider>
      </div>
    )
  )
}

export default Highlights
