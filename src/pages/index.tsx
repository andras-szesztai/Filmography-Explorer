import React from 'react'
import { useSelector } from 'react-redux'

// Components
import {
  Layout,
  SearchDashboardDesktop,
  SearchBar,
  PersonDetailCard,
  FavoritePersonsList,
  PersonCreditsChart,
  MovieDetailCardContainerRight,
  MovieDetailCardContainerLeft
} from '../components'

// Types
import { CombinedState } from '../types/state'

// Actions

// Hooks
import { useFetchPersonData, useFetchGenreList } from '../hooks'

// Constants

// Helpers

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
        <PersonDetailCard />
        <FavoritePersonsList />
        <PersonCreditsChart />
        <MovieDetailCardContainerLeft />
        <MovieDetailCardContainerRight />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
