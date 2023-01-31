import React, { useState } from 'react'
import classNames from 'classnames'

import Header from '../Pages/Header'
import './basicTemplate.scss'
import Footer from 'Template/Pages/Footer'

const BasicTemplate = ({ footer = true, isHomePage = false, children }) => {
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  const [isScrolled, setIsScrolled] = useState(false)
  var prevScrollpos = window.pageYOffset
  window.onscroll = () => {
    if (document.getElementById('navbar')) {
      var currentScrollPos = window.pageYOffset

      if (prevScrollpos > currentScrollPos) {
        // document.getElementById("navbar").style.transform = "none";

        setIsScrolled(false)
      } else if (currentScrollPos > 50) {
        // document.getElementById("navbar").style.transform = "translateY(-100%)";

        setIsScrolled(true)
      }
      prevScrollpos = currentScrollPos
    }
  }

  // pass props to chidren component
  const _children = isHomePage
    ? React.Children.map(children, child =>
      React.cloneElement(child, {
        isHeaderHidden: isScrolled
      })
    )
    : children

  const classHeader = classNames('basic-template__header', {
    'basic-template__header-hidden': isScrolled
  })

  return (
    <div className='basic-template'>
      <div className={classHeader} id='navbar'>
        <Header isScrolled={isScrolled} />
      </div>
      <div className='basic-template__children'>
        <div className='basic-template__children--content'>{_children}</div>
      </div>
      {footer && (
        <div className='basic-template__footer'>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default BasicTemplate
