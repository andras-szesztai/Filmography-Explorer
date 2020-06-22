import * as React from 'react'
import { useSelector } from 'react-redux'

// Components
import { Layout, SearchDashboardDesktop, SearchBar } from '../components'

// Types
import { CombinedState } from '../types/state'

const IndexPage = () => {
  const personState = useSelector((state: CombinedState) => state.personReducer)
  console.log('IndexPage -> personState', personState)

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
