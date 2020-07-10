import React from 'react'
import { useSelector } from 'react-redux'

// Components
import { useLocalStorage } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'
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

// Constants

// Helpers

const IndexPage = () => {
  const activeNameID = useSelector((state: CombinedState) => state.personReducer.activeNameID)
  const { position, activeMovieID } = useSelector((state: CombinedState) => state.movieReducer)

  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorage(LOCAL_STORE_ACCESSORS.bookmarkedMovies, {} as BookmarkedMoviesObject)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })
  useSetBookmarkedMoviesOnMount(bookmarkedMovies)

  const isLeft = !!activeMovieID && position === 1
  const isRight = !!activeMovieID && position === 0

  return (
    <Layout>
      <SearchDashboardDesktop>
        <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
        <PersonDetailCard />
        <FavoritePersonsList />
        <PersonCreditsChart />
        <AnimatePresence>
          {isLeft && (
            <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MovieDetailCardContainerLeft bookmarkedMovies={bookmarkedMovies} setBookmarkedMovies={setBookmarkedMovies} isOpen={isLeft} />
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isRight && (
            <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MovieDetailCardContainerRight
                bookmarkedMovies={bookmarkedMovies}
                setBookmarkedMovies={setBookmarkedMovies}
                isOpen={isRight}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </SearchDashboardDesktop>
    </Layout>
  )
}

export default IndexPage
