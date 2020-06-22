import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import { Layout, SearchDashboardDesktop, SearchBar } from '../components'

// Types
import { CombinedState } from '../types/state'

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)
  const dispatch = useDispatch()
  return (
    <Layout>
      <SearchDashboardDesktop>
        {/* <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button> */}
        <SearchBar placeholder="Search for a director, actor, writer . . . " />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
