import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Layout, Row, Col } from 'antd'
import './header.scss'

export default function Header () {
  const { Header } = Layout

  return (
    <Layout>
      <Header className='header'>
        <div className='header__content'>
          <Row className='header__content--row'>
            <Col xs={12} sm={6} md={8}>
              <a href='/'>
                <FontAwesomeIcon icon={faInstagram} />
                <div className='split' />
                <div>The Wind Blows</div>
              </a>
            </Col>
            <Col xs={0} sm={10} md={8}>
              Search
            </Col>
            <Col xs={12} sm={8} md={8}>
              Profile User
            </Col>
          </Row>
        </div>
      </Header>
    </Layout>
  )
}
