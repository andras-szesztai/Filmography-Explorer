import * as React from 'react'

// Components
import { Layout, SearchDashboardDesktop, SearchBar } from '../components'

const IndexPage = () => {
  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
