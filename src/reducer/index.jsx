import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// Reducers
import personReducer from './personReducer/personReducer'

const rootReducer = combineReducers({ personReducer })

// eslint-disable-next-line react/prop-types
export default function({ element }) {
  return (
    /* eslint-disable no-underscore-dangle */
    <Provider store={createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      {element}
    </Provider>
  )
}
