import React, { useState } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { useMediaQuery } from 'react-responsive'
import Measure from 'react-measure'

import WrapperAbout from '../WrapperAbout'
import Page1 from './Page1'
import './scss/aboutMe.scss'
// import Page2 from "./Page2";
import PageItem from './PageItem'
import Page3 from './Page3'
import Page4 from './Page4'

const textContent = [
  {
    title: 'WEB DEVELOPER',
    description: 'Front-end',
    subDescription: 'Love programming and especially become a web developer.'
  },
  {
    title: 'PHOTOGRAPHY',
    description: 'Save the beautiful moments',
    subDescription: 'Take beautiful photos of people, nature, animals...'
  },
  {
    title: 'TRAVEL',
    description: 'Discover something new.',
    subDescription: 'Make memories to last an life time.'
  }
]

const AboutMe = () => {
  const [indexOfImage, setIndexOfImage] = useState(0)
  const handleChangeImage = index => {
    setIndexOfImage(index)
  }
  const [distanceFromTopSticky, setDistanceFromTopSticky] = useState(0)
  const handleSetDistanceSticky = val => {
    setDistanceFromTopSticky(val)
  }
  const [heightSticky, setHeightSticky] = useState(0)
  const handleSetHeightSticky = val => {
    setHeightSticky(val)
  }
  const [heightPage1, setHeightPage1] = useState({})
  const isMinWidth768 = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <WrapperAbout>
      <div className='about-me'>
        {isMinWidth768 && <Page1 panelImage={false} panelText />}
        <StickyContainer>
          <Measure
            offset
            onResize={contentRect => {
              setHeightPage1(
                contentRect.offset.height + contentRect.offset.top
              )
            }}
          >
            {({ measureRef }) => (
              <div ref={measureRef}>
                {isMinWidth768 ? (
                  <Page1 panelImage panelText={false} />
                ) : (
                  <Page1 />
                )}
              </div>
            )}
          </Measure>
          <div className='about-me__sticky'>
            <Sticky distanceFromTop={80}>
              {({ style, distanceFromTop, calculatedHeight }) => (
                <div style={style}>
                  <Page3
                    isMinWidth768={isMinWidth768}
                    heightPage1={heightPage1}
                    distanceFromTop={distanceFromTop}
                    indexOfImage={indexOfImage}
                    handleSetDistanceSticky={handleSetDistanceSticky}
                    calculatedHeight={calculatedHeight}
                    handleSetHeightSticky={handleSetHeightSticky}
                  />
                </div>
              )}
            </Sticky>
          </div>
          {textContent.map((item, idx) => (
            <PageItem
              key={idx}
              {...item}
              heightPage1={heightPage1}
              distanceFromTopSticky={distanceFromTopSticky}
              handleChangeImage={handleChangeImage}
              indexOfItem={idx}
              indexOfImage={indexOfImage}
              heightSticky={heightSticky}
              isMinWidth768={isMinWidth768}
            />
          ))}
        </StickyContainer>
        <Page4 />
      </div>
    </WrapperAbout>
  )
}

export default AboutMe
