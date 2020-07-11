import React from 'react'
import { useSelector } from 'react-redux'

// Components
import { useLocalStorage } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'
import {
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

// Constants

// Helpers

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)
  const { position, activeMovieID } = useSelector((state: CombinedState) => state.movieReducer)

  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorage(LOCAL_STORE_ACCESSORS.bookmarkedMovies, {} as BookmarkedMoviesObject)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })
  useSetBookmarkedMoviesOnMount(bookmarkedMovies)

  return (
    <SearchDashboardDesktop>
      <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
      <PersonDetailCard />
      <FavoritePersonsList />
      <PersonCreditsChart />
      <AnimatePresence>
        {!!activeMovieID && position === 1 && (
          <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }}>
            <MovieDetailCardContainerLeft bookmarkedMovies={bookmarkedMovies} setBookmarkedMovies={setBookmarkedMovies} />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!activeMovieID && position === 0 && (
          <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }}>
            <MovieDetailCardContainerRight bookmarkedMovies={bookmarkedMovies} setBookmarkedMovies={setBookmarkedMovies} />
          </motion.span>
        )}
      </AnimatePresence>
    </SearchDashboardDesktop>
  )
}

export default IndexPage
