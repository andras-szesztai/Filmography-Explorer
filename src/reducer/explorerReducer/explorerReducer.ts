import { useReducer, useEffect } from 'react'
import { usePrevious } from 'react-use'
import axios from 'axios'

// import { useActiveMovieCredits, useFetchGenres, useFetchPersonCredit } from './hooks'

// Actions
import { API_ROOT } from '../../constants/url'
import { makeFilteredData, makeUniqData } from '../../utils/dataHelpers'
import { PersonCreditDataObject, Person, FormattedPersonCreditDataObject } from '../../types/person'

const initialState = {
  activeNameID: -1,
  dataSets: {
    personDetails: [],
    personCredits: []
  },
  loading: {
    personDetails: false,
    personCredits: false
  },
  error: {
    personDetails: false,
    personCredits: false
  },
  personDetailsCard: {
    isOpen: false
  }
}

export const SET_ACTIVE_NAME_ID = 'SET_ACTIVE_NAME_ID'
export const FETCH_NAME_CREDITS_BY_ID = 'FETCH_NAME_CREDITS_BY_ID'
export const FETCH_NAME_CREDITS_BY_ID_SUCCESS = 'FETCH_NAME_CREDITS_BY_ID_SUCCESS'
export const FETCH_NAME_CREDITS_BY_ID_FAIL = 'FETCH_NAME_CREDITS_BY_ID_FAIL'
export const OPEN_PERSON_DETAILS_CARD = 'OPEN_PERSON_DETAILS_CARD'
export const CLOSE_PERSON_DETAILS_CARD = 'CLOSE_PERSON_DETAILS_CARD'

export function setActiveNameID(id: number) {
  return {
    type: SET_ACTIVE_NAME_ID,
    payload: id
  }
}

interface PersonDetails {
  name: string
}

interface PersonCredits {
  name: string
}

interface State {
  activeNameID: number
  dataSets: {
    personDetails: PersonDetails[]
    personCredits: PersonCredits[]
  }
  loading: {
    personDetails: boolean
    personCredits: boolean
  }
  error: {
    personDetails: boolean
    personCredits: boolean
  }
  personDetailsCard: {
    isOpen: boolean
  }
}

interface Action {
  type: string
  payload?: number | { credits: { cast: FormattedPersonCreditDataObject[]; crew: FormattedPersonCreditDataObject[]; id: number } }
}

const moviesDashboardReducer = (state: State, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case SET_ACTIVE_NAME_ID:
      return { ...state, activeNameID: payload }
    default:
      return state
  }
}

export default function useExplorerReducer() {
  const [state, dispatch] = useReducer(moviesDashboardReducer, initialState)
  const { activeNameID } = state
  const prevState = usePrevious(state)

  useEffect(() => {
    if (prevState && prevState.activeNameID && activeNameID !== prevState.activeNameID) {
      dispatch({ type: FETCH_NAME_CREDITS_BY_ID })
      axios
        .all([
          axios.get(`${API_ROOT}/person/${activeNameID}?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/person/${activeNameID}/combined_credits?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((details, credits) => {
            const filteredCast = makeFilteredData({ data: credits.data.cast, type: 'cast' })
            const filteredCrew = makeFilteredData({ data: credits.data.crew, type: 'crew' })
            dispatch({
              type: FETCH_NAME_CREDITS_BY_ID_SUCCESS,
              payload: {
                details: details.data,
                credits: {
                  cast: makeUniqData({ data: filteredCast, type: 'cast' }),
                  crew: makeUniqData({ data: filteredCrew, type: 'crew' }),
                  id: credits.data.id
                }
              }
            })
          })
        )
        .catch(error =>
          dispatch({
            type: FETCH_NAME_CREDITS_BY_ID_FAIL,
            payload: {
              details: error,
              credits: error
            }
          })
        )
    }
  })

  return { state, prevState, dispatch }
}
