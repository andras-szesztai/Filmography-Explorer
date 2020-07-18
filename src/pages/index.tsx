import React from 'react'
import { useSelector } from 'react-redux'
import { useLocalStorage, useWindowSize } from 'react-use'
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
import { Disclaimer } from '../components/atoms'

// Types
import { CombinedState } from '../types/state'
import { BookmarkedMoviesObject } from '../types/movie'

// Hooks
import { useFetchPersonData, useFetchGenreList, useSetBookmarkedMoviesOnMount, useDetectDeviceType } from '../hooks'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'
import { EXPLORER_EXPLAINER } from '../constants/explainerPages'

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

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const device = useDetectDeviceType()

  return (
    <SearchDashboardDesktop>
      <ExplainerCard pages={EXPLORER_EXPLAINER} />
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
      {windowWidth < 900 && (
        <Disclaimer
          bigText="Sorry, the dashboard has not yet been optimized for smaller screen size."
          smallText="Please set your browser's width bigger if possible, or open it on a
        wider screen, thank you!"
          height={windowHeight}
          width={windowWidth}
        />
      )}
      {(device === 'mobile' || device === 'tablet') && (
        <Disclaimer
          bigText={`Sorry, the dashboard has not yet been optimized for ${device === 'mobile' ? 'mobile devices' : 'tablet'}.`}
          smallText={`Please use it in your desktop browser until ${device === 'mobile' ? 'mobile' : 'tablet'} layout will be added!`}
          height={windowHeight}
          width={windowWidth}
        />
      )}
    </SearchDashboardDesktop>
  )
}

export default IndexPage
