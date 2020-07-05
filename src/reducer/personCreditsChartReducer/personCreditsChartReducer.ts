// Actions
import {
  updateChartSettings,
  populateHoveredMovie,
  emptyHoveredMovie,
  UPDATE_CHART_SETTINGS,
  POPULATE_HOVERED_MOVIE,
  EMPTY_HOVERED_MOVIE
} from './actions'

import { PersonCreditsChartState } from '../../types/state'
import { FormattedPersonCreditDataObject } from '../../types/person'

const initialState = {
  nameId: 0,
  movieSearchData: [] as FormattedPersonCreditDataObject[],
  isBoth: false,
  scales: {
    xScaleDomain: [] as Date[],
    sizeScaleDomain: [] as number[]
  },
  isYDomainSynced: true,
  isSizeDynamic: true,
  hoveredMovie: {
    id: 0,
    data: {} as FormattedPersonCreditDataObject,
    yPosition: 0,
    xPosition: 0
  }
}

type Action = ReturnType<typeof updateChartSettings | typeof populateHoveredMovie | typeof emptyHoveredMovie>

const personCreditsChartReducer = (state: PersonCreditsChartState = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_CHART_SETTINGS:
      return {
        ...state,
        nameId: action.settings.nameId,
        movieSearchData: action.settings.movieSearchData,
        isBoth: action.settings.isBoth,
        scales: action.settings.scales
      }
    case POPULATE_HOVERED_MOVIE:
      return {
        ...state,
        hoveredMovie: action.movie
      }
    case EMPTY_HOVERED_MOVIE:
      return {
        ...state,
        hoveredMovie: {
          id: 0,
          data: {} as FormattedPersonCreditDataObject,
          yPosition: 0,
          xPosition: 0
        }
      }
    default:
      return state
  }
}

export default personCreditsChartReducer
