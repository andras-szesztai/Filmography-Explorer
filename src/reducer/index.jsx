import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// Reducers
// eslint-disable-next-line import/extensions
import personReducer from './personReducer/personReducer'
import personCreditsChartReducer from './personCreditsChartReducer/personCreditsChartReducer.ts'
import movieReducer from './movieReducer/movieReducer.ts'
import chartSettingsReducer from './chartSettingsReducer/chartSettingsReducer.ts'
import bookmarkedChartReducer from './bookmarkedChartReducer/bookmarkedChartReducer.ts'

const rootReducer = combineReducers({
  personReducer,
  personCreditsChartReducer,
  movieReducer,
  bookmarkedChartReducer,
  chartSettingsReducer
})

// eslint-disable-next-line react/prop-types
export default function({ element }) {
  const devTools =
    /* eslint-disable no-underscore-dangle */
    process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  return <Provider store={createStore(rootReducer, devTools)}>{element}</Provider>
}
