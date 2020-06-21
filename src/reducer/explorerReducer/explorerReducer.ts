import { useReducer } from 'react'
import { usePrevious } from 'react-use'

// import { useActiveMovieCredits, useFetchGenres, useFetchPersonCredit } from './hooks'

// Actions
import { setActiveNameID } from './actions'

// Constants
import { NO_ACTIVE_MOVIE } from '../../constants/stateValues'

const initialState = {
  activeNameID: undefined,
  activeMovie: {
    id: undefined,
    data: {},
    position: undefined,
    cast: [],
    crew: []
  },
  dataSets: {
    personDetails: undefined,
    personCredits: undefined
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
    isOpen: undefined
  }
}

type State = typeof initialState
type Action = ReturnType<typeof setActiveNameID>

const moviesDashboardReducer = (state: State, action: Action) => {
  const { type, payload } = action
  const types = {
    SET_ACTIVE_ID: () => ({
      ...state,
      activeNameID: payload.id,
      activeMovie: payload.isActiveMovieClicked ? state.activeMovie : NO_ACTIVE_MOVIE
    })
    // FETCH_INFO_BY_ID: () => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     personDetails: true,
    //     personCredits: true
    //   }
    // }),
    // FETCH_INFO_BY_ID_SUCCESS: () => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     personDetails: false,
    //     personCredits: false
    //   },
    //   dataSets: {
    //     ...state.dataSets,
    //     personDetails: payload.details,
    //     personCredits: payload.credits
    //   }
    // }),
    // FETCH_INFO_BY_ID_FAIL: () => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     personDetails: false,
    //     personCredits: false
    //   },
    //   dataSets: {
    //     ...state.dataSets,
    //     personDetails: undefined,
    //     personCredits: undefined
    //   },
    //   error: {
    //     ...state.error,
    //     personDetails: payload.details,
    //     personCredits: payload.credits
    //   }
    // }),
    // OPEN_PERSON_DETAILS_CARD: () => ({
    //   ...state,
    //   personDetailsCard: {
    //     ...state.personDetailsCard,
    //     isOpen: true
    //   }
    // }),
    // CLOSE_PERSON_DETAILS_CARD: () => ({
    //   ...state,
    //   personDetailsCard: {
    //     ...state.personDetailsCard,
    //     isOpen: false
    //   }
    // })
  }
  return types[type] ? types[type]() : state
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
