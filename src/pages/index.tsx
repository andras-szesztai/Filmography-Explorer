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
  const { position, activeMovieID } = useSelector((state: CombinedState) => state.movieReducer)
  console.log('IndexPage -> activeMovieID', !!activeMovieID && position === 0)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
        <PersonDetailCard />
        <FavoritePersonsList />
        <PersonCreditsChart />
        <MovieDetailCardContainerLeft isOpen={!!activeMovieID && position === 1} />
        <MovieDetailCardContainerRight isOpen={!!activeMovieID && position === 0} />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
