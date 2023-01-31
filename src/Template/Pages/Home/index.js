import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col } from 'antd'
import { get, isEmpty, filter, find } from 'lodash'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { StickyContainer, Sticky } from 'react-sticky'
import classNames from 'classnames'

import axios from 'utils/axiosConfig'
import BasicTemplate from 'Template/BasicTemplate'
import PostItem from 'Containers/PostItem'
import PostStatus from 'Containers/PostStatus'
import Profile from './HomeProfile'
import SuggestionForUser from 'Template/Pages/Explore/Suggestion'
import Footer from 'Template/Pages/Footer'
import Pinwheel from 'Components/Loaders/Pinwheel'
import Suggested from 'Template/Pages/Explore/Suggestion/Suggested'
import './home.scss'

const HomePage = ({ isHeaderHidden = false }) => {
  // get posts
  const viewerId = useSelector((state = {}) =>
    get(state, 'profile.data.user.id', '')
  )
  const tokenUser = get(
    JSON.parse(localStorage.getItem('state') || {}),
    'profile.data.tokens.token',
    ''
  )

  const [state, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
    limit: 12,
    page: 1,
    totalItem: 0
  })

  useEffect(() => {
    const source = axios.CancelToken.source()

    const feactData = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }))

        const response = await axios({
          method: 'get',
          url: '/posts-following',
          params: {
            userId: viewerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            'Content-Type': 'application/json'
          },
          cancelToken: source.token
        })

        // console.log("response fetch home", response);
        setState(prevState => ({
          ...prevState,
          data: [
            ...get(prevState, 'data', []),
            ...filter(
              get(response, 'data.data', []),
              o =>
                find(get(prevState, 'data', []), p => p.id === o.id) ===
                undefined
            )
          ],
          totalItem: get(response, 'data.totalItem'),
          error: null,
          isLoading: false
        }))
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("cancelled fetch homepage");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }))
          console.log('Error fetch homepage', error)
        }
      }
    }

    !isEmpty(tokenUser) && feactData()

    // unmount
    return () => {
      source.cancel()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, tokenUser])

  // load more item
  const hasMoreItems = state.data.length < state.totalItem
  const getMoreItems = useCallback(() => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }))
  }, [state.data.length, state.limit, state.page])

  // new post status
  const handleAddNewPost = useCallback(item => {
    setState(prevState => ({
      ...prevState,
      data: [item, ...prevState.data],
      totalItem: prevState.totalItem + 1
    }))
  }, [])

  const handleRemovePost = useCallback(
    id => {
      const data =
        state.data && state.data.length > 0
          ? state.data.filter(item => item.id !== id)
          : []

      setState(prevState => ({
        ...prevState,
        data,
        totalItem: prevState.totalItem - 1
      }))
    },
    [state.data]
  )

  // render items
  const _renderPostItem = useCallback(
    items =>
      items &&
      items.length > 0 &&
      items.map((item, idx) => (
        <div key={item.id || idx} className='home-post__item'>
          <PostItem {...item} isHomePage handleRemovePost={handleRemovePost} />
        </div>
      )),
    [handleRemovePost]
  )

  const stylesAdvanceScroll = {
    marginTop: isHeaderHidden ? '30px' : '90px'
  }

  const classAdvance = classNames('home__content--advance', {
    'home__content--advance-hidden': state.data && state.data.length === 0
  })

  return (
    <StickyContainer>
      <div className='home'>
        <div className='home__content'>
          <Row>
            <Col xs={24} lg={state.data && state.data.length > 0 ? 17 : 24}>
              <div className='home__content--post'>
                <div className='post-list'>
                  <div className='post-list__post-status'>
                    <PostStatus handleAddNewPost={handleAddNewPost} />
                  </div>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={getMoreItems}
                    hasMore={hasMoreItems}
                    threshold={300}
                  >
                    {_renderPostItem(state.data)}
                  </InfiniteScroll>
                  {state.isLoading && (
                    <div className='post-list__is-loading'>
                      <Pinwheel isLoading size={100} />
                    </div>
                  )}
                  {!state.isLoading &&
                    state.data &&
                    state.data.length === 0 && <Suggested />}
                </div>
              </div>
            </Col>
            <Col xs={0} lg={7}>
              <Sticky topOffset={0}>
                {({ style }) => (
                  <div className={classAdvance} style={style}>
                    <div style={stylesAdvanceScroll} />
                    <Profile />
                    <SuggestionForUser />
                    <Footer isHomePage />
                  </div>
                )}
              </Sticky>
            </Col>
          </Row>
        </div>
      </div>
    </StickyContainer>
  )
}

const WrappedHomePage = () => (
  <BasicTemplate footer={false} isHomePage>
    <HomePage />
  </BasicTemplate>
)

export default WrappedHomePage
