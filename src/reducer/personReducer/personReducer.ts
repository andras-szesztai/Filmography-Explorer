// Actions
import {
  setActiveNameID,
  fetchNameCredits,
  fetchNameCreditsSuccess,
  SET_ACTIVE_NAME_ID,
  FETCH_NAME_CREDITS_BY_ID,
  FETCH_NAME_CREDITS_BY_ID_SUCCESS,
  FETCH_NAME_CREDITS_BY_ID_FAIL,
  fetchNameCreditsFail
} from './actions'

import { PersonState } from '../../types/state'

const initialState = {
  activeNameID: 0,
  dataSets: {
    details: [],
    credits: {
      cast: [],
      crew: []
    }
  },
  loading: {
    personDetails: false,
    personCredits: false
  },
  error: ''
}

type Action = ReturnType<typeof setActiveNameID | typeof fetchNameCredits | typeof fetchNameCreditsSuccess | typeof fetchNameCreditsFail>

const personReducer = (state: PersonState = initialState, action: Action) => {
  switch (action.type) {
    case SET_ACTIVE_NAME_ID:
      return { ...state, activeNameID: action.id }
    case FETCH_NAME_CREDITS_BY_ID:
      return {
        ...state,
        loading: {
          personDetails: true,
          personCredits: true
        },
        error: ''
      }
    case FETCH_NAME_CREDITS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: {
          personDetails: false,
          personCredits: false
        },
        dataSets: action.data
      }
    case FETCH_NAME_CREDITS_BY_ID_FAIL:
      return {
        activeNameID: 0,
        dataSets: {
          details: [],
          credits: {
            cast: [],
            crew: []
          }
        },
        loading: {
          personDetails: false,
          personCredits: false
        },
        error: 'Sorry, we were unable to load the data'
      }
    default:
      return state
  }
}

export default personReducer
