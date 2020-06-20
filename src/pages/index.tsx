import * as React from 'react'

// Components
import { Layout, SearchDashboardDesktop, SearchBar } from '../components'

const IndexPage = () => {
  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
