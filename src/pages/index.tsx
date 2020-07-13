import React from 'react'
import { useSelector } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import {
  SearchDashboardDesktop,
  SearchBar,
  PersonDetailCard,
  FavoritePersonsList,
  PersonCreditsChart,
  MovieDetailCardContainerRight,
  MovieDetailCardContainerLeft,
  ExplainerCard
} from '../components'

// Types
import { CombinedState } from '../types/state'
import { BookmarkedMoviesObject } from '../types/movie'

// Hooks
import { useFetchPersonData, useFetchGenreList, useSetBookmarkedMoviesOnMount } from '../hooks'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'

const IndexPage = () => {
  const { activeNameID } = useSelector((state: CombinedState) => state.personReducer)
  const { position, activeMovieID, bookmarks, activeMovieData, mediaType, loading } = useSelector(
    (state: CombinedState) => state.movieReducer
  )
  const genreFilter = useSelector((state: CombinedState) => state.personCreditsChartReducer.genreFilter)

  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorage(LOCAL_STORE_ACCESSORS.bookmarkedMovies, {} as BookmarkedMoviesObject)

  useFetchGenreList()
  useFetchPersonData({ activeNameID })
  useSetBookmarkedMoviesOnMount(!!Object.keys(bookmarks).length, bookmarkedMovies)

  return (
    <SearchDashboardDesktop>
      <SearchBar placeholder="Search for a director, actor, writer . . . " activeNameID={activeNameID} />
      <PersonDetailCard />
      <FavoritePersonsList />
      <PersonCreditsChart />
      <AnimatePresence>
        {!!activeMovieID && position === 1 && (
          <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }}>
            <MovieDetailCardContainerLeft
              activeNameID={activeNameID}
              genreFilter={genreFilter}
              mediaType={mediaType}
              activeMovieData={activeMovieData}
              loading={loading.activeMovieData}
              setBookmarkedMovies={setBookmarkedMovies}
              bookmarkedMovies={bookmarkedMovies}
            />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!activeMovieID && position === 0 && (
          <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }}>
            <MovieDetailCardContainerRight
              activeNameID={activeNameID}
              genreFilter={genreFilter}
              mediaType={mediaType}
              activeMovieData={activeMovieData}
              loading={loading.activeMovieData}
              setBookmarkedMovies={setBookmarkedMovies}
              bookmarkedMovies={bookmarkedMovies}
            />
          </motion.span>
        )}
      </AnimatePresence>
      <ExplainerCard />
    </SearchDashboardDesktop>
  )
}

export default IndexPage
