import React from 'react';
import { Layout, Row, Col } from 'antd';
import './header.scss';
import Brand from './Brand';
import Search from './Search';
import Menu from './Menu';
import classNames from 'classnames';

export default function Header({ isScroll }) {
  const { Header } = Layout
  const headerClass = classNames('header', { header__fixed: isScroll })

  return (
    <Header className={headerClass}>
      <div className='header__content'>
        <Row className='header__content--row'>
          <Col xs={12} sm={6} md={8}>
            <Brand />
          </Col>
          <Col xs={0} sm={10} md={8}>
            <Search />
          </Col>
          <Col xs={12} sm={8} md={8}>
            <Menu />
          </Col>
        </Row>
      </div>
    </Header>
  )
}
