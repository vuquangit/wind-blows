import React, { useState, useEffect } from 'react';
import Header from '../Pages/Header';
import './basicTemplate.scss';

const BasicTemplate = ({ children }) => {
  const [isScroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = e => {
    let element = e.target.scrollingElement

    if (element.scrollTop > 0) {
      // do something at end of scroll
      setScroll(true)
    } else setScroll(false)
  };

  return (
    <div className='basic-template' onScroll={handleScroll}>
      <div className='basic-template__header'>
        <Header isScroll={isScroll} />
      </div>
      <div className='basic-template__children'>{children}</div>
    </div>
  )
};

export default BasicTemplate
