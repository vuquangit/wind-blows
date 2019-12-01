import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function Brand() {
  return (
    <Link to='/' className='header__brand'>
      <Row className='header__brand--items'>
        <Col xs={24} sm={24} md={0} lg={4}>
          <FontAwesomeIcon icon={faFan} className='header__brand--icon' />
        </Col>
        <Col xs={0} sm={0} md={0} lg={1}>
          <div className='header__brand--divide' />
        </Col>
        <Col xs={0} sm={0} md={24} lg={19}>
          <h3 className='header__brand--text'>The Wind Blows</h3>
        </Col>
      </Row>
    </Link>
  )
}

export default Brand
