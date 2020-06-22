import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import { usePrevious } from 'react-use'
import axios from 'axios'
import { Layout, SearchDashboardDesktop, SearchBar } from '../components'

// Types
import { CombinedState } from '../types/state'

// Actions
import { fetchNameCredits, fetchNameCreditsSuccess, fetchNameCreditsFail } from '../reducer/personReducer/actions'

// Constants
import { API_ROOT } from '../constants/url'

// Helpers
import { makeFilteredData, makeUniqData } from '../utils/dataHelpers'

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)
  const dispatch = useDispatch()
  const prevActiveNameID = usePrevious(activeNameID)

  React.useEffect(() => {
    if (typeof prevActiveNameID === 'number' && activeNameID !== prevActiveNameID) {
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
        .catch(() => dispatch(fetchNameCreditsFail()))
    }
  })

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
