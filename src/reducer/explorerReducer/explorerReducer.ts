import { useReducer, useEffect } from 'react'
import { usePrevious } from 'react-use'
import axios from 'axios'

// Constants
import { API_ROOT } from '../../constants/url'
// Helpers
import { makeFilteredData, makeUniqData } from '../../utils/dataHelpers'
// Types
import { FormattedPersonCreditDataObject, PersonDetails } from '../../types/person'

// Actions
import {
  setActiveNameID,
  fetchNameCredits,
  fetchNameCreditsSuccess,
  SET_ACTIVE_NAME_ID,
  FETCH_NAME_CREDITS_BY_ID,
  FETCH_NAME_CREDITS_BY_ID_SUCCESS
} from './actions'

const initialState = {
  activeNameID: -1,
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
  error: {
    personDetails: false,
    personCredits: false
  }
}

type State = {
  activeNameID: number
  dataSets?: {
    details: PersonDetails[]
    credits: {
      cast: FormattedPersonCreditDataObject[]
      crew: FormattedPersonCreditDataObject[]
    }
  }
  loading: {
    personDetails: boolean
    personCredits: boolean
  }
  error: {
    personDetails: boolean
    personCredits: boolean
  }
}

type Action = ReturnType<typeof setActiveNameID | typeof fetchNameCredits | typeof fetchNameCreditsSuccess>

const moviesDashboardReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ACTIVE_NAME_ID:
      return { ...state, activeNameID: action.id }
    case FETCH_NAME_CREDITS_BY_ID:
      return {
        ...state,
        loading: {
          personDetails: true,
          personCredits: true
        }
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
      dispatch(fetchNameCredits())
      axios
        .all([
          axios.get(`${API_ROOT}/person/${activeNameID}?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/person/${activeNameID}/combined_credits?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((details, credits) => {
            const filteredCast = makeFilteredData({ data: credits.data.cast, type: 'cast' })
            const filteredCrew = makeFilteredData({ data: credits.data.crew, type: 'crew' })
            dispatch(
              fetchNameCreditsSuccess({
                details: details.data,
                credits: {
                  cast: makeUniqData({ data: filteredCast, type: 'cast' }),
                  crew: makeUniqData({ data: filteredCrew, type: 'crew' })
                }
              })
            )
          })
        )
    }
  })

  return { state, prevState, dispatch }
}
