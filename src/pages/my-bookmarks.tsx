import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { css } from '@emotion/core'
import { isEmpty, uniq, flatten, maxBy, minBy } from 'lodash'

// Components
import { AnimatePresence, motion } from 'framer-motion'
import { SearchDashboardDesktop, MovieDetailCardContainerLeft, MovieDetailCardContainerRight } from '../components'
import { GenreFilter, TitleSearch, BubbleChart, DateAxis, PersonFilter } from '../components/molecules'

// Types
import { CombinedState } from '../types/state'
import { BookmarkedMoviesObject } from '../types/movie'
import { FavoritePersonsObject } from '../types/person'

// Actions
import { updateFavoritePersons } from '../reducer/personReducer/actions'
import { populateOnMount } from '../reducer/bookmarkedChartReducer/actions'

// Hooks
import { useFetchGenreList, useSetBookmarkedMoviesOnMount } from '../hooks'
import { useFetchActiveMovieDetails } from '../components/organisms/MovieDetailCards/hooks'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'

// Styles
import { colors, space, fontSize } from '../styles/variables'

// Constants

// Helpers

const MyBookMarksPage = () => {
  const { personReducer, movieReducer, bookmarkedChartReducer } = useSelector((state: CombinedState) => state)
  const dispatch = useDispatch()

  // Populate store with favorites if start page
  const [didPopulateFavorites, setDidPopulateFavorites] = React.useState(false)
  const [bookmarkedMovies] = useLocalStorage<BookmarkedMoviesObject>(LOCAL_STORE_ACCESSORS.bookmarkedMovies)
  const [favoritePersons] = useLocalStorage<FavoritePersonsObject>(LOCAL_STORE_ACCESSORS.favoritePersons)
  useSetBookmarkedMoviesOnMount(!!Object.keys(movieReducer.bookmarks).length, bookmarkedMovies)
  React.useEffect(() => {
    if (!didPopulateFavorites) {
      if (favoritePersons && Object.keys(favoritePersons).length) {
        if (!Object.keys(personReducer.favorites).length) {
          dispatch(updateFavoritePersons(favoritePersons))
        }
      }
      setDidPopulateFavorites(true)
    }
  })
  useFetchGenreList()

  const init = React.useRef(true)
  React.useEffect(() => {
    if (didPopulateFavorites && init.current) {
      init.current = false
      if (!isEmpty(movieReducer.bookmarks)) {
        const allBookmarks = Object.values(movieReducer.bookmarks)
        const allGenre = flatten(allBookmarks.map(movie => movie.genres))
        const uniqGenres = uniq(allGenre)
        const genreList = uniqGenres.map(id => ({ id: +id, count: allGenre.filter(g => g === id).length }))
        const xScaleMax = maxBy(allBookmarks, d => new Date(d.date)) // TODO: dry with updateChartSettings
        const xScaleMin = minBy(allBookmarks, d => new Date(d.date))
        const xScaleDomain = [(xScaleMin && new Date(xScaleMin.date)) || new Date(), (xScaleMax && new Date(xScaleMax.date)) || new Date()]
        const sizeMax = maxBy(allBookmarks, d => d.vote_count)
        const sizeMin = minBy(allBookmarks, d => d.vote_count)
        const sizeScaleDomain = [(sizeMin && sizeMin.vote_count) || 0, (sizeMax && sizeMax.vote_count) || 0]
        dispatch(populateOnMount({ genreList, titleList: allBookmarks, scales: { xScaleDomain, sizeScaleDomain } }))
      }
      if (!isEmpty(personReducer.favorites) && favoritePersons) {
        dispatch(updateFavoritePersons(favoritePersons))
      }
    }
  })

  useFetchActiveMovieDetails({
    isOpen: true,
    activeMovieID: bookmarkedChartReducer.bookmarkedActiveMovie.id,
    mediaType: bookmarkedChartReducer.bookmarkedActiveMovie.mediaType,
    isBookmarkedChart: true
  })

  const [isGenreOpen, setIsGenreOpen] = React.useState(false)
  const [isTitleOpen, setIsTitleOpen] = React.useState(false)
  const [isPersonOpen, setIsPersonOpen] = React.useState(false)

  const [isFirstEntered, setIsFirstEntered] = React.useState(true)

  return (
    <SearchDashboardDesktop>
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          onMouseLeave={() => setIsFirstEntered(true)}
          css={css`
            height: 80%;
            background: ${colors.bgColorPrimary};
            width: calc(100% - ${space[13]}px);
            transform: translateY(${space[7]}px);
            border-radius: ${space[1]}px;
            display: grid;
            grid-template-rows: 50px auto;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;

              color: ${colors.textColorPrimary};
              background: ${colors.bgColorPrimary};
              font-size: ${fontSize.md};
              letter-spacing: 1px;

              position: relative;
              z-index: 100;
            `}
          >
            {bookmarkedChartReducer.titleList.length > 1 && (
              <TitleSearch
                titles={bookmarkedChartReducer.titleList}
                setIsGenreOpen={setIsGenreOpen}
                setIsTitleOpen={setIsTitleOpen}
                isTitleOpen={isTitleOpen}
                isBookmarkChart
              />
            )}
            {bookmarkedChartReducer.titleList.length > 1 && bookmarkedChartReducer.genreList.length > 1 && (
              <GenreFilter
                genres={bookmarkedChartReducer.genreList}
                setIsTitleOpen={setIsTitleOpen}
                setIsGenreOpen={setIsGenreOpen}
                isGenreOpen={isGenreOpen}
                isBookmarkChart
              />
            )}
            {Object.keys(personReducer.favorites).length > 1 && (
              <PersonFilter
                isPersonOpen={isPersonOpen}
                setIsGenreOpen={setIsGenreOpen}
                setIsTitleOpen={setIsTitleOpen}
                setIsPersonOpen={setIsPersonOpen}
              />
            )}
          </div>
          <div
            css={css`
              display: grid;
              grid-template-rows: 1fr 35px;
            `}
          >
            <BubbleChart
              xScaleDomain={bookmarkedChartReducer.scales.xScaleDomain}
              sizeScaleDomain={bookmarkedChartReducer.scales.sizeScaleDomain}
              isYDomainSynced
              isSizeDynamic
              data={bookmarkedChartReducer.titleList}
              activeMovieID={bookmarkedChartReducer.bookmarkedActiveMovie.id}
              type="main"
              title="Bookmarked"
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              tooltipYPosition={1}
              hoveredMovieID={bookmarkedChartReducer.bookmarkedHoveredMovie.id}
              genreFilter={bookmarkedChartReducer.genreFilter}
              isBookmarkChart
            />
            <DateAxis
              xScaleDomain={bookmarkedChartReducer.scales.xScaleDomain}
              dataSets={bookmarkedChartReducer.titleList}
              isBoth={false}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              activeMovieID={bookmarkedChartReducer.bookmarkedActiveMovie.id}
              hoveredMovieID={bookmarkedChartReducer.bookmarkedHoveredMovie.id}
              genreFilter={bookmarkedChartReducer.genreFilter}
              tooltipWithRole={false}
              isBookmarkChart
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {!!bookmarkedChartReducer.bookmarkedActiveMovie.id && bookmarkedChartReducer.bookmarkedActiveMovie.position === 1 && (
          <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }}>
            <MovieDetailCardContainerLeft
              genreFilter={bookmarkedChartReducer.genreFilter}
              mediaType={bookmarkedChartReducer.bookmarkedActiveMovie.mediaType}
              activeMovieData={{
                crew: bookmarkedChartReducer.bookmarkedActiveMovie.crew,
                cast: bookmarkedChartReducer.bookmarkedActiveMovie.cast,
                details: bookmarkedChartReducer.bookmarkedActiveMovie.details
              }}
              loading={bookmarkedChartReducer.bookmarkedActiveMovie.loading}
              isBookmarkedChart
            />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!bookmarkedChartReducer.bookmarkedActiveMovie.id && bookmarkedChartReducer.bookmarkedActiveMovie.position === 0 && (
          <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 1 } }}>
            <MovieDetailCardContainerRight
              genreFilter={bookmarkedChartReducer.genreFilter}
              mediaType={bookmarkedChartReducer.bookmarkedActiveMovie.mediaType}
              activeMovieData={{
                crew: bookmarkedChartReducer.bookmarkedActiveMovie.crew,
                cast: bookmarkedChartReducer.bookmarkedActiveMovie.cast,
                details: bookmarkedChartReducer.bookmarkedActiveMovie.details
              }}
              loading={bookmarkedChartReducer.bookmarkedActiveMovie.loading}
              isBookmarkedChart
            />
          </motion.span>
        )}
      </AnimatePresence>
    </SearchDashboardDesktop>
  )
}

export default MyBookMarksPage
