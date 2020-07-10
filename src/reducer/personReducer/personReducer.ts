// Actions
import {
  setActiveNameID,
  fetchNameCredits,
  fetchNameCreditsSuccess,
  SET_ACTIVE_NAME_ID,
  FETCH_NAME_CREDITS_BY_ID,
  FETCH_NAME_CREDITS_BY_ID_SUCCESS,
  FETCH_NAME_CREDITS_BY_ID_FAIL,
  fetchNameCreditsFail,
  UPDATE_FAVORITE_PERSONS,
  updateFavoritePersons
} from './actions'

// Types
import { PersonState } from '../../types/state'
import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject, PersonGenresObject } from '../../types/person'
import { MovieObject } from '../../types/movie'

const initialState = {
  activeNameID: 0,
  dataSets: {
    details: {} as PersonDetails,
    credits: {
      cast: [] as FormattedPersonCreditDataObject[],
      crew: [] as FormattedPersonCreditDataObject[]
    },
    genres: [] as PersonGenresObject[],
    allTitles: [] as MovieObject[]
  },
  loading: {
    personDetails: false,
    personCredits: false
  },
  favorites: {} as FavoritePersonsObject,
  error: ''
}

type Action = ReturnType<
  | typeof setActiveNameID
  | typeof fetchNameCredits
  | typeof fetchNameCreditsSuccess
  | typeof fetchNameCreditsFail
  | typeof updateFavoritePersons
>

const personReducer = (state: PersonState = initialState, action: Action) => {
  switch (action.type) {
    case SET_ACTIVE_NAME_ID:
      return {
        ...state,
        activeNameID: action.id
      }
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
        ...state,
        activeNameID: 0,
        isFetched: false,
        dataSets: {
          details: [],
          credits: {
            cast: [],
            crew: []
          },
          genres: [],
          allTitles: []
        },
        loading: {
          personDetails: false,
          personCredits: false
        },
        error: 'Sorry, we were unable to load the data'
      }
    case UPDATE_FAVORITE_PERSONS:
      return {
        ...state,
        favorites: action.favoritesObject
      }
    default:
      return state
  }
}

export default personReducer
