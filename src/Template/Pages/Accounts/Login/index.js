import React, { useEffect } from 'react'
import { isEmpty, get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col } from 'antd'

import Login from './Login'
import PanelImage from './PanelImage'
import Loading from 'Template/Pages/Loading'
import './login.scss'

const WrapperLogin = ({ history }) => {
  const dispatch = useDispatch()
  const {
    data: profileData = {},
    isFetching = false
  } = useSelector((state = {}) => get(state, 'profile', {}))

  useEffect(() => {
    if (!isEmpty(profileData)) {
      history.push('/')
    }
  }, [dispatch, history, profileData])

  return (
    <div className='login'>
      {isFetching && !isEmpty(profileData) ? (
        <Loading />
      ) : (
        <Row>
          <Col xs={0} sm={0} md={12}>
            <PanelImage />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Login />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default withRouter(WrapperLogin)
