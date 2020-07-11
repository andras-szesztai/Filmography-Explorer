import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/core'

// Components
import { isEmpty, uniq, flattenDeep, flatten } from 'lodash'
import { mainModule } from 'process'
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
import useSetActiveNameIDOnMount from '../components/organisms/PersonDetailCard/hooks/useSetActiveNameIDOnMount'
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'
import { colors, space, fontSize } from '../styles/variables'
import { GenreFilter, TitleSearch } from '../components/molecules'
import { FavoritePersonsObject, PersonGenresObject } from '../types/person'
import { updateFavoritePersons } from '../reducer/personReducer/actions'
import { updateGenreList, populateBookmarkedTitleFilter } from '../reducer/bookmarkedChartReducer/actions'

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
        dispatch(updateGenreList(genreList))
        dispatch(populateBookmarkedTitleFilter(allBookmarks))
      }
      // if (!isEmpty(personReducer.favorites)) {
      //   console.log('populate persons filter')
      // }
    }
  })

  const [isGenreOpen, setIsGenreOpen] = React.useState(false)
  const [isTitleOpen, setIsTitleOpen] = React.useState(false)

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
          // onMouseLeave={() => setIsFirstEntered(true)}
          css={css`
            height: 90%;
            background: ${colors.bgColorPrimary};
            width: calc(100% - ${space[8]}px);
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
            <TitleSearch
              titles={bookmarkedChartReducer.titleList}
              setIsGenreOpen={setIsGenreOpen}
              setIsTitleOpen={setIsTitleOpen}
              isTitleOpen={isTitleOpen}
              isBookmarkChart
            />
            <GenreFilter
              genres={bookmarkedChartReducer.genreList}
              setIsTitleOpen={setIsTitleOpen}
              setIsGenreOpen={setIsGenreOpen}
              isGenreOpen={isGenreOpen}
              isBookmarkChart
            />
          </div>
        </div>
      </div>
    </SearchDashboardDesktop>
  )
}

export default MyBookMarksPage
