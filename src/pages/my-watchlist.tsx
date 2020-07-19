import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { css } from '@emotion/core'
import { isEmpty, uniq, flatten, maxBy, minBy } from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'

// Components
import { SearchDashboardDesktop, MovieDetailCardContainerLeft, MovieDetailCardContainerRight, ExplainerCard } from '../components'
import { GenreFilter, TitleSearch, BubbleChart, DateAxis, PersonFilter, ChartSettings } from '../components/molecules'
import { BookmarkIcon } from '../components/atoms'

// Types
import { CombinedState } from '../types/state'
import { BookmarkedMoviesObject } from '../types/movie'
import { FavoritePersonsObject } from '../types/person'

// Actions
import { updateFavoritePersons } from '../reducer/personReducer/actions'
import { populateOnMount, updateBookmarkGenreList, updateBookmarkedPersonList } from '../reducer/bookmarkedChartReducer/actions'

// Hooks
import { useFetchGenreList, useSetBookmarkedMoviesOnMount } from '../hooks'
import { useFetchActiveMovieDetails } from '../components/organisms/MovieDetailCards/hooks'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'
import { BOOKMARKED_EXPLAINER } from '../constants/explainerPages'

// Styles
import { colors, space, fontSize } from '../styles/variables'

const MyBookMarksPage = () => {
  const { personReducer, movieReducer, bookmarkedChartReducer } = useSelector((state: CombinedState) => state)
  const dispatch = useDispatch()
  // TODO: tidy it up

  // Populate store with favorites if start page
  const [didPopulateFavorites, setDidPopulateFavorites] = React.useState(false)
  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorage<BookmarkedMoviesObject>(LOCAL_STORE_ACCESSORS.bookmarkedMovies)
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
        const allPersons = flatten(allBookmarks.map(movie => movie.credits))
        const uniqGenres = uniq(allGenre)
        const personList = Object.values(personReducer.favorites)
          .map(fav => ({
            id: +fav.id,
            name: fav.name,
            count: allPersons.filter(p => p === fav.id).length
          }))
          .filter(p => !!p.count)
          .sort((a, b) => b.count - a.count)
        const genreList = uniqGenres.map(id => ({ id: +id, count: allGenre.filter(g => g === id).length }))
        const xScaleMax = maxBy(allBookmarks, d => new Date(d.date)) // TODO: dry with updateChartSettings
        const xScaleMin = minBy(allBookmarks, d => new Date(d.date))
        const xScaleDomain = [(xScaleMin && new Date(xScaleMin.date)) || new Date(), (xScaleMax && new Date(xScaleMax.date)) || new Date()]
        const sizeMax = maxBy(allBookmarks, d => d.vote_count)
        const sizeMin = minBy(allBookmarks, d => d.vote_count)
        const sizeScaleDomain = [(sizeMin && sizeMin.vote_count) || 0, (sizeMax && sizeMax.vote_count) || 0]
        dispatch(populateOnMount({ genreList, personList, titleList: allBookmarks, scales: { xScaleDomain, sizeScaleDomain } }))
      }
    }
  })

  useFetchActiveMovieDetails({
    isOpen: true,
    activeMovieID: bookmarkedChartReducer.bookmarkedActiveMovie.id,
    mediaType: bookmarkedChartReducer.bookmarkedActiveMovie.mediaType,
    isBookmarkedChart: true
  })

  // Update genre list upon favorite filter
  React.useEffect(() => {
    if (bookmarkedChartReducer.genreList.length) {
      const allBookmarks = Object.values(movieReducer.bookmarks)
      const filteredBookMarks = bookmarkedChartReducer.personFilter.length
        ? allBookmarks.filter(movie => bookmarkedChartReducer.personFilter.some(person => movie.credits.includes(person)))
        : allBookmarks
      const allGenre = flatten(filteredBookMarks.map(movie => movie.genres))
      const uniqGenres = uniq(allGenre)
      const genreList = uniqGenres.map(id => ({ id: +id, count: allGenre.filter(g => g === id).length }))
      dispatch(updateBookmarkGenreList(genreList))
    }
  }, [bookmarkedChartReducer.personFilter.length])

  // Update person list upon genre filter
  React.useEffect(() => {
    if (bookmarkedChartReducer.personList.length) {
      // TODO dry it up
      const allBookmarks = Object.values(movieReducer.bookmarks)
      const filteredBookMarks = bookmarkedChartReducer.genreFilter.length
        ? allBookmarks.filter(movie => bookmarkedChartReducer.genreFilter.some(genre => movie.genres.includes(genre)))
        : allBookmarks
      const allPersons = flatten(filteredBookMarks.map(movie => movie.credits))
      const personList = Object.values(personReducer.favorites)
        .map(fav => ({
          id: +fav.id,
          name: fav.name,
          count: allPersons.filter(p => p === fav.id).length
        }))
        .filter(p => !!p.count)
        .sort((a, b) => b.count - a.count)
      dispatch(updateBookmarkedPersonList(personList))
    }
  }, [bookmarkedChartReducer.genreFilter.length])

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
        {!isEmpty(movieReducer.bookmarks) ? (
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
                  personsFilter={bookmarkedChartReducer.personFilter}
                  isBookmarkChart
                />
              )}
              {bookmarkedChartReducer.titleList.length > 1 && bookmarkedChartReducer.genreList.length > 1 && (
                <GenreFilter
                  genres={bookmarkedChartReducer.genreList}
                  personsFilter={bookmarkedChartReducer.personFilter}
                  isBookmarkChart
                />
              )}
              {Object.keys(personReducer.favorites).length > 1 && <PersonFilter />}
              <ChartSettings />
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
                isSizeDynamic
                data={bookmarkedChartReducer.titleList}
                activeMovieID={bookmarkedChartReducer.bookmarkedActiveMovie.id}
                type="main"
                title="Watchlist"
                isFirstEntered={isFirstEntered}
                setIsFirstEntered={setIsFirstEntered}
                tooltipYPosition={1}
                hoveredMovieID={bookmarkedChartReducer.bookmarkedHoveredMovie.id}
                genreFilter={bookmarkedChartReducer.genreFilter}
                isBookmarkChart
                personFilter={bookmarkedChartReducer.personFilter}
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
                personFilter={bookmarkedChartReducer.personFilter}
              />
            </div>
          </div>
        ) : (
          <div
            css={css`
              font-size: ${fontSize.lg};
              color: ${colors.textColorPrimary};
              letter-spacing: 0.8px;
              user-select: none;
            `}
          >
            Please start by bookmarking movies or series on the Explore page!{' '}
            <span
              css={css`
                position: relative;
              `}
            >
              <span
                css={css`
                  position: absolute;
                  top: -1px;
                  left: 4px;
                `}
              >
                <BookmarkIcon isBookmarked isHovered={false} />
              </span>
            </span>
          </div>
        )}
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
              bookmarkedMovies={bookmarkedMovies}
              setBookmarkedMovies={setBookmarkedMovies}
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
              bookmarkedMovies={bookmarkedMovies}
              setBookmarkedMovies={setBookmarkedMovies}
            />
          </motion.span>
        )}
      </AnimatePresence>
      <ExplainerCard pages={BOOKMARKED_EXPLAINER} />
    </SearchDashboardDesktop>
  )
}

export default MyBookMarksPage
