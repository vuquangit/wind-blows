import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { registerServiceWorker as registerServiceWorkerFCM } from 'Firebases/register-sw'
import { Provider } from 'react-redux'
import throttle from 'lodash.throttle'
import { CloudinaryContext } from 'cloudinary-react'
import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'

import App from './App'
import configureStore from './Redux/Store'
import { loadState, saveState } from './localStorage'
import cloudinaryConfig from './cloudinaryConfig'
// eslint-disable-next-line
import firebase from "Firebases/firebase";
import './index.css'

registerServiceWorkerFCM()

// local store redux
const persistedState = loadState()
const store = configureStore(persistedState)
store.subscribe(
  throttle(() => {
    saveState({
      profile: store.getState().profile
    })
  }, 1000)
)

// dev tool
if (process.env.NODE_ENV !== 'development') {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    for (const [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === 'function' ? () => {} : null
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <CloudinaryContext cloudName={cloudinaryConfig.cloud_name}>
      <App />
    </CloudinaryContext>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
