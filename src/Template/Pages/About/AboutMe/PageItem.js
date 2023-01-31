import React, { useState, useEffect } from 'react'
import Measure from 'react-measure'
import classNames from 'classnames'

const PageItem = ({
  title = '',
  description = '',
  subDescription = '',
  heightPage1 = 0,
  distanceFromTopSticky = 0,
  handleChangeImage = () => {},
  indexOfItem = 0,
  indexOfImage = 0,
  heightSticky = 0,
  isMinWidth768 = false
}) => {
  const [dimension, setDismension] = useState({ top: -1 })

  useEffect(() => {
    if (!isMinWidth768) {
      if (distanceFromTopSticky < heightPage1 * 0.85) handleChangeImage(0)
      else if (distanceFromTopSticky > dimension.top * 0.85)
        handleChangeImage(indexOfItem + 1)
    } else {
      if (distanceFromTopSticky + heightSticky + 72 < heightPage1)
        handleChangeImage(0)
      else if (distanceFromTopSticky + heightSticky + 72 > dimension.top)
        handleChangeImage(indexOfItem + 1)
    }
  }, [
    dimension.top,
    distanceFromTopSticky,
    handleChangeImage,
    heightPage1,
    heightSticky,
    indexOfItem,
    isMinWidth768
  ])

  const classPageItem = classNames('page-item', {
    'page-item-show': indexOfImage === indexOfItem + 1
  })

  return (
    <Measure
      offset
      onResize={contentRect => {
        setDismension(contentRect.offset)
      }}
    >
      {({ measureRef }) => (
        <div className={classPageItem}>
          <div className='_8h2u _8jt3' ref={measureRef}>
            <div className='_8f30'>
              <div className='_8f0s'>
                <div className='_8h2w' />
              </div>
              <div className='_8f0s _8knk _8f0z'>
                <div className='_8g8k _8g8o _8g8t _8g90 _8g95'>
                  <div className='_8g87 _8g88 _8g5_ _8hkw _8hk-'>
                    <div id='u_0_d' style={{ opacity: 1 }}>
                      <div className='_8g86 _8g7y _8g80'>
                        <p className='_8g86 _8kjd _8iq5 _8ird'>{title}</p>
                        <h2 className='_8iq3 _8g86 _8kjd _8iq7'>
                          {description}
                        </h2>
                        <p className='_8g86 _8iq8 _8ipi'>{subDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Measure>
  )
}

export default PageItem
