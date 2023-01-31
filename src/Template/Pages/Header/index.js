import React from 'react'
import { Layout, Row, Col } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { get, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

import Brand from './Brand'
import Search from 'Template/Pages/Search'
import Menu from './Menu'
import Registration from './Registration'
import './scss/header.scss'

const Header = ({ isScrolled = false }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 575px)' })
  const isSigned = useSelector(
    (state = {}) => !isEmpty(get(state, 'profile.data.user.id', ''))
  )

  return (
    <Layout.Header className='header'>
      <div className='header__content'>
        <Row className='header__content--row'>
          <Col xs={12} sm={8} md={8}>
            <Brand />
          </Col>
          {isSigned ? (
            <>
              {!isSmallScreen && (
                <Col xs={0} sm={10} md={8}>
                  <Search isScrolled={isScrolled} />
                </Col>
              )}
              <Col xs={12} sm={6} md={8}>
                <Menu isScrolled={isScrolled} isSmallScreen={isSmallScreen} />
              </Col>
            </>
          ) : (
            <Col xs={12} sm={16} md={16}>
              <Registration />
            </Col>
          )}
        </Row>
      </div>
    </Layout.Header>
  )
}

export default Header
