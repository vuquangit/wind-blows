import React, { useState, useCallback, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { Button } from 'antd'
import classNames from 'classnames'

import Pinwheel from 'Components/Loaders/Pinwheel'
import './header.scss'

const Header = () => {
  const username = useSelector((state = {}) =>
    get(state, 'profile.data.user.username', '')
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleCloseMenu = () => setIsMenuOpen(false)

  const classMenuButton = classNames('menu-line', {
    'menu-line-rotate': isMenuOpen
  })
  const classMenuList = classNames('header-about__content--menu-list', {
    'header-about__content--menu-list-open': isMenuOpen
  })

  const [backgroundImage, setBackgroundImage] = useState([
    '_8iw9 _8kuk',
    '_8iw9 _8kul',
    '_8iw9 _8kum',
    '_8iw9 _8kun',
    '_8iw9 _8kuo',
    '_8iw9 _8kup'
  ])

  const [intervalCount, setIntervalCount] = useState(0)
  const intervalObj = useCallback(() => {
    setIntervalCount(prevState =>
      prevState + 1 < backgroundImage.length ? prevState + 1 : 0
    )
  }, [backgroundImage.length])

  const addClass = useCallback(item => {
    const val = item.split(' ')
    val.indexOf('_8lxg') === -1 && val.splice(1, 0, '_8lxg')
    return val.join(' ')
  }, [])

  useLayoutEffect(() => {
    setBackgroundImage(
      backgroundImage.map((item, idx) =>
        idx === intervalCount ||
        idx ===
          (intervalCount - 1 >= 0
            ? intervalCount - 1
            : backgroundImage.length - 1)
          ? addClass(item)
          : item.replace(' _8lxg', '')
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalCount])

  const nIntervId = useRef(null)
  useLayoutEffect(() => {
    if (isMenuOpen && backgroundImage.length > 0)
      nIntervId.current = setInterval(intervalObj, 3000)
    else clearInterval(nIntervId.current)

    return () => clearInterval(nIntervId.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen])

  // scroll header
  // const [isScrolled, setIsScrolled] = useState(false);
  var prevScrollpos = window.pageYOffset
  window.onscroll = () => {
    if (document.getElementById('navHeaderAbout')) {
      var currentScrollPos = window.pageYOffset

      if (prevScrollpos > currentScrollPos) {
        document.getElementById('navHeaderAbout').style.transform = 'none'

        // setIsScrolled(false);
      } else if (currentScrollPos > 50) {
        document.getElementById('navHeaderAbout').style.transform =
          'translateY(-100%)'

        // setIsScrolled(true);
      }
      prevScrollpos = currentScrollPos
    }
  }

  const classHeaderContentBackground = classNames(
    'header-about__content--background',
    {
      'header-about__content--background-hidden': window.pageYOffset < 100
    }
  )

  return (
    <div className='header-about' id='navHeaderAbout'>
      {isMenuOpen && (
        <div onClick={handleCloseMenu} className='header-about__menu-close' />
      )}
      <div className='header-about__content'>
        <div className={classHeaderContentBackground} />
        <nav>
          <Button
            onClick={handleToggleMenu}
            className='header-about__content--menu-button'
          >
            <div className={classMenuButton} />
            <div className={classMenuButton} />
          </Button>
          <div className={classMenuList}>
            <div className='menu-list__background'>
              {backgroundImage &&
                backgroundImage.length > 0 &&
                backgroundImage.map((item, idx) => (
                  <div className={item} key={idx} />
                ))}
            </div>
            <div className='menu-list__content'>
              <div className='menu-list__content--wrap'>
                <ul>
                  <li className='menu-item'>
                    <Link
                      to='/the-wind-blows/about'
                      className='menu-item__content'
                    >
                      Home
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link
                      to='/the-wind-blows/about-me'
                      className='menu-item__content'
                    >
                      About me
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className='header-about__content--logo'>
          <Pinwheel size={32} />
        </div>
        <Link to='/' className='header-about__content--username'>
          {username}
        </Link>
      </div>
    </div>
  )
}

export default Header
