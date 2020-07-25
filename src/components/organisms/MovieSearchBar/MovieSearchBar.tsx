import React from 'react'
import { IoIosSearch, IoIosCloseCircle } from 'react-icons/io'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import sortBy from 'lodash/sortBy'
import slice from 'lodash/slice'
import { css } from '@emotion/core'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import { SearchBarInput, SearchIconContainer, SearchResultsContainer, ActiveSearchResultIndicator } from '../../atoms'
import { NoResultContent, MovieSearchResultContent } from '../../molecules'

// Constants
import { API_ROOT } from '../../../constants/url'

// Actions
import { setActiveMovieID } from '../../../reducer/movieReducer/actions'

// Hooks
import { useDebouncedSearch } from '../../../hooks'

// Types
import { CombinedState } from '../../../types/state'
import { MovieSearchResultObject } from '../../../types/movie'

// Styles
import { colors } from '../../../styles/variables'
import { duration } from '../../../styles/animation'

interface Props {
  placeholder: string
  isVisible: boolean
}

const SearchBar = ({ placeholder, isVisible }: Props) => {
  const dispatch = useDispatch()
  const [movieSearchResults, setMovieSearchResults] = React.useState({ resultArray: [] as MovieSearchResultObject[] })
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)
  const [activeResult, setActiveResult] = React.useState(0)
  const [noResult, setNoResult] = React.useState(false)
  const activeMovieID = useSelector((state: CombinedState) => state.movieReducer.activeMovieID)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const fetchNames = (text: string) => {
    if (text) {
      axios
        .all([
          axios.get(`${API_ROOT}/search/tv?api_key=${process.env.MDB_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`),
          axios.get(`${API_ROOT}/search/movie?api_key=${process.env.MDB_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`)
        ])
        .then(
          axios.spread((tv, movie) => {
            const tvResults = tv.data.results
            const movieResults = movie.data.results
            const mostRelevant = slice(
              sortBy([...movieResults, ...tvResults], d => -d.popularity),
              0,
              5
            )
            if (mostRelevant.length) {
              setMovieSearchResults({
                resultArray: mostRelevant.map(d => ({
                  id: d.id as number,
                  poster_path: d.poster_path as string,
                  title: (d.title || d.name) as string,
                  media_type: d.title ? 'Movie' : 'Tv'
                }))
              })
            } else {
              setNoResult(true)
            }
          })
        )
        .catch(error => console.log(error))
    } else {
      setMovieSearchResults({ resultArray: [] })
    }
  }
  const { inputText, setInputText } = useDebouncedSearch(fetchNames, duration.md)

  const resetSearch = () => {
    setMovieSearchResults({ resultArray: [] })
    setInputText('')
    setSearchIsFocused(false)
    setActiveResult(0)
    if (inputRef && inputRef.current) {
      inputRef.current.blur()
    }
    if (noResult) {
      setNoResult(false)
    }
  }

  const isResultVisible = !!movieSearchResults.resultArray.length
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={css`
            position: absolute;
          `}
        >
          <SearchBarInput
            inputRef={inputRef}
            placeholder={placeholder}
            searchIsFocused={searchIsFocused}
            setSearchIsFocused={setSearchIsFocused}
            setNoResult={setNoResult}
            noResult={noResult}
            inputValue={inputText}
            setInputText={setInputText}
            resultsLength={movieSearchResults.resultArray.length}
            setResults={setMovieSearchResults}
            setActiveResult={setActiveResult}
            activeResult={activeResult}
            resetSearch={resetSearch}
            handleResultSelect={(index: number) => {
              const movie = movieSearchResults.resultArray[index] && movieSearchResults.resultArray[index]
              if (activeMovieID !== movie.id) {
                dispatch(
                  setActiveMovieID({
                    id: movie.id,
                    position: 1,
                    mediaType: movie.media_type.toLowerCase()
                  })
                )
              }
            }}
          />
          <SearchIconContainer isVisible={!searchIsFocused} isLeft animateProps={{ x: -10, rotateY: -75 }}>
            <IoIosSearch size={22} color={colors.textColorPrimary} />
          </SearchIconContainer>
          <SearchIconContainer isVisible={searchIsFocused} animateProps={{ x: 10, rotateY: 75 }} onClick={resetSearch}>
            <IoIosCloseCircle size={22} color={colors.accentSecondary} />
          </SearchIconContainer>
          <ActiveSearchResultIndicator isVisible={isResultVisible} activeResult={activeResult} />
          <SearchResultsContainer isVisible={isResultVisible || noResult}>
            {!noResult &&
              movieSearchResults.resultArray.map((movie, i: number) => (
                <MovieSearchResultContent
                  key={movie.id}
                  zIndex={Math.abs(i - 4)}
                  data={movie}
                  handleClick={() => {
                    if (movie.id !== activeMovieID) {
                      if (activeMovieID !== movie.id) {
                        dispatch(
                          setActiveMovieID({
                            id: movie.id,
                            position: 1,
                            mediaType: movie.media_type.toLowerCase()
                          })
                        )
                      }
                    }
                    resetSearch()
                  }}
                  handleMouseover={() => {
                    setActiveResult(i)
                  }}
                />
              ))}
            {noResult && <NoResultContent inputText={inputText} />}
          </SearchResultsContainer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchBar
