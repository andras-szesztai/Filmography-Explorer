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
  const { position, activeMovieID, mediaType } = useSelector((state: CombinedState) => state.movieReducer)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
        <PersonDetailCard />
        <FavoritePersonsList />
        <PersonCreditsChart />
        <MovieDetailCardContainerLeft isOpen activeMovieID={activeMovieID} mediaType={mediaType} />
        <MovieDetailCardContainerRight isOpen={!!activeMovieID && position === 0} activeMovieID={activeMovieID} mediaType={mediaType} />
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
