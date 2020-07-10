import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import { useLocalStorage } from 'react-use'
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
import { BookmarkedMoviesObject } from '../types/movie'

// Actions

// Hooks
import { useFetchPersonData, useFetchGenreList, useSetBookmarkedMoviesOnMount } from '../hooks'
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'
import { updateBookmarkedMovies } from '../reducer/movieReducer/actions'

// Constants

// Helpers

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })

  useSetBookmarkedMoviesOnMount()

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
