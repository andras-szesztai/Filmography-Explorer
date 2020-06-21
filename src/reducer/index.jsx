import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// Reducers
import personReducer from './personReducer/personReducer'

const rootReducer = combineReducers({ personReducer })

// eslint-disable-next-line react/prop-types
export default function({ element }) {
  return <Provider store={createStore(rootReducer)}>{element}</Provider>
}
