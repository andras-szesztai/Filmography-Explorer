import { useReducer, useEffect } from 'react'
import { usePrevious } from 'react-use'
import axios from 'axios'

// Constants
import { API_ROOT } from '../../constants/url'
// Helpers
import { makeFilteredData, makeUniqData } from '../../utils/dataHelpers'
// Types
import { FormattedPersonCreditDataObject } from '../../types/person'

export const SET_ACTIVE_NAME_ID = 'SET_ACTIVE_NAME_ID'
export const FETCH_NAME_CREDITS_BY_ID = 'FETCH_NAME_CREDITS_BY_ID'
export const FETCH_NAME_CREDITS_BY_ID_SUCCESS = 'FETCH_NAME_CREDITS_BY_ID_SUCCESS'
export const FETCH_NAME_CREDITS_BY_ID_FAIL = 'FETCH_NAME_CREDITS_BY_ID_FAIL'
export const OPEN_PERSON_DETAILS_CARD = 'OPEN_PERSON_DETAILS_CARD'
export const CLOSE_PERSON_DETAILS_CARD = 'CLOSE_PERSON_DETAILS_CARD'

export function setActiveNameID(id: number) {
  return {
    type: SET_ACTIVE_NAME_ID,
    id
  } as const
}

function openCard(bool: boolean) {
  return {
    type: OPEN_PERSON_DETAILS_CARD,
    bool
  } as const
}

interface PersonDetails {
  name: string
}

interface PersonCredits {
  name: string
}

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

type State = {
  activeNameID: number
  dataSets?: {
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

type Action = ReturnType<typeof setActiveNameID | typeof openCard>

const moviesDashboardReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ACTIVE_NAME_ID:
      return { ...state, activeNameID: action.id }
    case OPEN_PERSON_DETAILS_CARD:
      return { ...state, personDetailsCard: { isOpen: action.bool } }
    default:
      return state
  }
}

export default function useExplorerReducer() {
  const [state, dispatch] = useReducer(moviesDashboardReducer, initialState)
  const { activeNameID } = state
  const prevState = usePrevious(state)

  // useEffect(() => {
  //   if (prevState && prevState.activeNameID && activeNameID !== prevState.activeNameID) {
  //     dispatch({ type: FETCH_NAME_CREDITS_BY_ID })
  //     axios
  //       .all([
  //         axios.get(`${API_ROOT}/person/${activeNameID}?api_key=${process.env.MDB_API_KEY}&language=en-US`),
  //         axios.get(`${API_ROOT}/person/${activeNameID}/combined_credits?api_key=${process.env.MDB_API_KEY}&language=en-US`)
  //       ])
  //       .then(
  //         axios.spread((details, credits) => {
  //           console.log('useExplorerReducer -> details', details)
  //           const filteredCast = makeFilteredData({ data: credits.data.cast, type: 'cast' })
  //           const filteredCrew = makeFilteredData({ data: credits.data.crew, type: 'crew' })
  //           dispatch({
  //             type: FETCH_NAME_CREDITS_BY_ID_SUCCESS,
  //             payload: {
  //               // details: details.data,
  //               credits: {
  //                 cast: makeUniqData({ data: filteredCast, type: 'cast' }),
  //                 crew: makeUniqData({ data: filteredCrew, type: 'crew' }),
  //                 id: credits.data.id
  //               }
  //             }
  //           })
  //         })
  //       )
  //       .catch(error =>
  //         dispatch({
  //           type: FETCH_NAME_CREDITS_BY_ID_FAIL,
  //           payload: {
  //             details: error,
  //             credits: error
  //           }
  //         })
  //       )
  //   }
  // })

  return { state, prevState, dispatch }
}
