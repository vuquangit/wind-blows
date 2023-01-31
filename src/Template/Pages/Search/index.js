import React, { useState, useEffect, useCallback } from 'react'
import { Input } from 'antd'
import { get, isEmpty, startsWith } from 'lodash'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import axios from 'utils/axiosConfig'
import BasicTemplate from 'Template/BasicTemplate'
import SearchResults from './SearchResults'
import './search.scss'

const SearchComponent = ({
  isSearchPage = false,
  isScrolled = false,
  isTagPeople = false,
  valueSearch = '',
  handleSelectSearchItem = () => {},
}) => {
  const { id: viewerId = '' } = useSelector((state = {}) => get(state, 'profile.data.user', {}))
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const source = axios.CancelToken.source()
  const [value, setValue] = useState('')
  const [state, setState] = useState({
    data: [],
    error: null,
    isLoading: false,
    page: 1,
    limit: 10,
    totalItems: 0,
  })

  const initSearch = useCallback(
    value => {
      source.cancel('Cancel search')

      const val = value.toLowerCase()
      setValue(val)

      setState(prevState => ({
        ...prevState,
        data: [],
        error: null,
        isLoading: false,
        page: 1,
        limit: 10,
        totalItems: 0,
      }))

      if (val) setIsOpenDropdown(true)
      else setIsOpenDropdown(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSearchChanged = e => {
    initSearch(e.target.value)
  }

  const handleSearchClick = () => {
    value && state.data && setIsOpenDropdown(true)
  }

  useEffect(() => {
    isTagPeople && initSearch(valueSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch])

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }))

        const response = await axios({
          method: 'get',
          url: '/explore/people/search',
          params: {
            value: value,
            viewerId,
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          cancelToken: source.token,
        })

        if (!isEmpty(response))
          setState(prevState => ({
            ...prevState,
            data: [...prevState.data, ...response.data.data],
            totalItems: response.data.totalItems,
            isLoading: false,
          }))
        else
          setState(prevState => ({
            ...prevState,
            isLoading: false,
          }))
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("cancelled fetch relationship");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false,
          }))
          console.log(error)
        }
      }
    }

    if (value) fetchSearch()

    // unmount
    return () => {
      source.cancel()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, state.page])

  // get more page
  const hasMoreItems = state.data.length < state.totalItems
  const getMoreItems = async () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }))
  }

  const _handleSelectSearchItem = val => {
    setIsOpenDropdown(false)
    handleSelectSearchItem(val)
  }

  const _searchResult = () => (
    <SearchResults
      value={value}
      items={state.data}
      isLoading={state.isLoading}
      hasMoreItems={hasMoreItems}
      getMoreItems={getMoreItems}
      isTagPeople={isTagPeople}
      handleSelectSearchItem={_handleSelectSearchItem}
    />
  )

  return (
    <div className='search-people'>
      {!isTagPeople && (
        <Input.Search
          placeholder='Search'
          allowClear
          loading={state.isLoading}
          onChange={handleSearchChanged}
          onClick={handleSearchClick}
        />
      )}
      {!isTagPeople
        ? isSearchPage
          ? _searchResult()
          : isOpenDropdown &&
            !isScrolled && (
            // eslint-disable-next-line react/jsx-indent
            <>
              <div
                className='search-people__close-dropdown'
                role='dialog'
                onClick={() => setIsOpenDropdown(false)}
              />
              <div className='search-people__dropdown-content'>
                <div className='search-people__arrow-up' />
                <div className='search-people__dropdown'>{_searchResult()}</div>
              </div>
            </>
          )
        : isOpenDropdown && (
          <>
            <div
              className='search-people__close-dropdown'
              role='dialog'
              onClick={() => setIsOpenDropdown(false)}
            />
            <div className='search-people__tag-people'>{_searchResult()}</div>
          </>
        )}
    </div>
  )
}

const WrappedSearch = ({ match = {}, ...restProps }) => {
  const isSearchPage = startsWith(match.path, '/explore/people/search')

  return (
    <>
      {isSearchPage ? (
        <BasicTemplate>
          <SearchComponent {...restProps} isSearchPage={isSearchPage} />
        </BasicTemplate>
      ) : (
        <SearchComponent {...restProps} isSearchPage={isSearchPage} />
      )}
    </>
  )
}

export default withRouter(WrappedSearch)
