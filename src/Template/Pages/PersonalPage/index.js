import React from 'react';
import { Row, Col } from 'antd';
import BasicTemplate from 'Template/BasicTemplate';
import Profile from './Profile';
import Highlights from './Highlights';
import TabControl from './TabControl';
import Follows from './Profile/Follows';
import './personalPage.scss';

const PersonalPage = () => {
  return (
    <BasicTemplate>
      <div className='personal'>
        <Profile />
        <Highlights />
        <Row>
          <Col xs={24} sm={24} md={0}>
            <Follows />
          </Col>
        </Row>
        <TabControl />
      </div>
    </BasicTemplate>
  )
};

export default PersonalPage
