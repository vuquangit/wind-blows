import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { notification } from 'antd'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { get, isEmpty } from 'lodash'

// import errorMessage from '@/constants/errorMessage'
import { storageKeys } from '@/constants/storage-keys'
import { history } from '@/hooks/useHistory'
import { IBaseResponse } from '@/interfaces/base'
import StorageService from '@/services/local-storage'
import { resetCredentials } from '@/store/auth'

const isDevelopment = process.env.NODE_ENV === 'development'

export const transformResponse = (response: IBaseResponse) => {
  const { success } = response
  if (success) {
    return camelizeKeys(response)
  }
  return Promise.reject()
}

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.APP_API_ENDPOINT,
  prepareHeaders: (headers) => {
    const authProfile = StorageService.get(storageKeys.authProfile)
    const accessToken: string = authProfile?.accessToken

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const body = args.body instanceof FormData ? args.body : decamelizeKeys(args.body)
  const params = decamelizeKeys(args.params)
  const argsCustom = { ...args, body, params }
  const result = await baseQuery(argsCustom, api, extraOptions)

  // show notification and redirect
  if (result.error) {
    handleNotification(api, result)
  }

  if (result.data) {
    result.data = camelizeKeys(result.data as any)
  }

  return result
}

const handleNotification = (api: BaseQueryApi, result: any) => {
  const errorStatus = result.error.status
  const error = result?.error?.data?.error
  let message = ''
  let navigateTo = ''

  // clear profile and token
  if (errorStatus === 401) {
    api.dispatch(resetCredentials())
    StorageService.remove(storageKeys.authProfile)
  }

  switch (errorStatus) {
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'このリクエストを認証されていません'
      navigateTo = '/login'
      break
    case 403:
      navigateTo = '/403'
      break
    // case 404:
    //   navigateTo = '/404'
    //   break
    case 500:
      message = 'サーバーが接続できませんでした。管理者に連絡するか、再試行してください'
      break
    default:
      message = ''
      navigateTo = ''
  }

  if (!window.navigator.onLine) {
    message = 'ネットワークエラー。ネットワークの接続を確認して再試行してください'
  }

  if (navigateTo && !isDevelopment) history.push(navigateTo)
}
