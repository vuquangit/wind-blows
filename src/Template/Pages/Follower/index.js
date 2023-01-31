import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import BasicTemplate from 'Template/BasicTemplate'
import RelationshipList from 'Containers/RelationshipList'

const Followers = ({ match = {}, isModal = false }) => {
  const { id: viewerId = '' } = useSelector((state = {}) =>
    get(state, 'profile.data.user')
  )
  const username = get(match, 'params.username', '')

  const apiConfig = {
    method: 'GET',
    endpoint: '/follows/followers/username/',
    params: {
      page: 1,
      limit: 20,
      username: username,
      viewerId: viewerId
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return (
    <>
      {isModal ? (
        <RelationshipList {...apiConfig} headerText='Follower' />
      ) : (
        <BasicTemplate>
          <RelationshipList {...apiConfig} headerText='Follower' />
        </BasicTemplate>
      )}
    </>
  )
}

export default withRouter(Followers)
