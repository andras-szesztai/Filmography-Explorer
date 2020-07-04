// Actions
import { UPDATE_CHART_START_SETTINGS, SET_IS_Y_DOMAIN_SYNCED, SET_IS_SIZE_DYNAMIC, SET_HOVERED_MOVIE, SET_SELECTED_MOVIE } from './actions'

import { PersonState, PersonCreditsChartState } from '../../types/state'
import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from '../../types/person'
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

// type Action = ReturnType<
//   // | typeof setActiveNameID
//   // | typeof fetchNameCredits
//   // | typeof fetchNameCreditsSuccess
//   // | typeof fetchNameCreditsFail
//   // | typeof updateFavoritePersons
// >

const personCreditsChartReducer = (state: PersonCreditsChartState = initialState) => {
  // switch (action.type) {
  //   default:
  //     return state
  // }
}

export default personCreditsChartReducer
