import React from 'react'
import { useSelector } from 'react-redux'

// Components
import { Layout, SearchDashboardDesktop, SearchBar, PersonDetailCard } from '../components'

// Types
import { CombinedState } from '../types/state'

// Actions

// Hooks
import { useFetchPersonData } from '../hooks'

// Constants

// Helpers

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)
  useFetchPersonData({ activeNameID })

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
        <PersonDetailCard />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
