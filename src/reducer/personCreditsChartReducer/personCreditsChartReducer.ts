// Actions
import { UPDATE_CHART_SETTINGS, updateChartSettings } from './actions'

import { PersonCreditsChartState } from '../../types/state'
import { FormattedPersonCreditDataObject } from '../../types/person'
import { MovieObject } from '../../types/personCreditsChart'

const initialState = {
  nameId: 0,
  movieSearchData: [] as MovieObject[],
  isBoth: false,
  scales: {
    xScaleDomain: [] as Date[],
    sizeScale: [] as number[]
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

type Action = ReturnType<typeof updateChartSettings>

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
    default:
      return state
  }
}

export default personCreditsChartReducer
