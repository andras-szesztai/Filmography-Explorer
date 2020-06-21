import { useReducer } from 'react'
import { usePrevious } from 'react-use'

// import { useActiveMovieCredits, useFetchGenres, useFetchPersonCredit } from './hooks'

// Actions
import { Action, SET_ACTIVE_NAME_ID } from './actions'

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
  const prevState = usePrevious(state)

  // useFetchPersonCredit({
  //   activeNameID: state.activeNameID,
  //   prevActiveNameID: prevState && prevState.activeNameID,
  //   dispatch
  // })

  return { state, prevState, dispatch }
}

// FETCH_INFO_BY_ID: () => ({
//     ...state,
//     loading: {
//       ...state.loading,
//       personDetails: true,
//       personCredits: true
//     }
//   }),
//   FETCH_INFO_BY_ID_SUCCESS: () => ({
//     ...state,
//     loading: {
//       ...state.loading,
//       personDetails: false,
//       personCredits: false
//     },
//     dataSets: {
//       ...state.dataSets,
//       personDetails: payload.details,
//       personCredits: payload.credits
//     }
//   }),
//   FETCH_INFO_BY_ID_FAIL: () => ({
//     ...state,
//     loading: {
//       ...state.loading,
//       personDetails: false,
//       personCredits: false
//     },
//     dataSets: {
//       ...state.dataSets,
//       personDetails: undefined,
//       personCredits: undefined
//     },
//     error: {
//       ...state.error,
//       personDetails: payload.details,
//       personCredits: payload.credits
//     }
//   }),
//   OPEN_PERSON_DETAILS_CARD: () => ({
//     ...state,
//     personDetailsCard: {
//       ...state.personDetailsCard,
//       isOpen: true
//     }
//   }),
//   CLOSE_PERSON_DETAILS_CARD: () => ({
//     ...state,
//     personDetailsCard: {
//       ...state.personDetailsCard,
//       isOpen: false
//     }
//   })
