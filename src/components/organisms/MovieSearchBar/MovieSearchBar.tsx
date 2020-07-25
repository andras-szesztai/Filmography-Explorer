import React from 'react'
import { IoIosSearch, IoIosCloseCircle } from 'react-icons/io'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import sortBy from 'lodash/sortBy'
import slice from 'lodash/slice'

// Components
import { SearchBarInput, SearchIconContainer, SearchResultsContainer, ActiveSearchResultIndicator } from '../../atoms'
import { SearchResultContent } from '../../molecules'

// Constants
import { API_ROOT } from '../../../constants/url'

// Actions
import { setActiveNameID } from '../../../reducer/personReducer/actions'
import { emptyMovieDetails } from '../../../reducer/movieReducer/actions'

// Hooks
import { useDebouncedSearch } from '../../../hooks'

// Types
import { PersonDetails } from '../../../types/person'
import { CombinedState } from '../../../types/state'

// Styles
import { colors } from '../../../styles/variables'
import { duration } from '../../../styles/animation'

export interface ResultArray {
  resultArray: PersonDetails[]
}

interface Props {
  placeholder: string
  activeNameID: number
}

const SearchBar = ({ placeholder, activeNameID }: Props) => {
  const dispatch = useDispatch()
  const [movieSearchResults, setMovieSearchResults] = React.useState<ResultArray>({ resultArray: [] })
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
              setMovieSearchResults({ resultArray: mostRelevant })
            } else {
              setNoResult(true)
            }
            console.log('fetchNames -> mostRelevant', mostRelevant)
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
    <>
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
          const newID = movieSearchResults.resultArray[index] && movieSearchResults.resultArray[index].id
          if (activeNameID !== newID) {
            if (activeMovieID) {
              dispatch(emptyMovieDetails())
            }
          }
          if (newID) {
            dispatch(setActiveNameID(newID))
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
          movieSearchResults.resultArray.map((res: PersonDetails, i: number) => (
            <SearchResultContent
              key={res.id}
              zIndex={Math.abs(i - 4)}
              data={res}
              handleClick={() => {
                if (res.id !== activeNameID) {
                  if (activeMovieID) {
                    dispatch(emptyMovieDetails())
                  }
                  dispatch(setActiveNameID(res.id))
                }
                resetSearch()
              }}
              handleMouseover={() => {
                setActiveResult(i)
              }}
            />
          ))}
        {noResult && <SearchResultContent noResult inputText={inputText} />}
      </SearchResultsContainer>
    </>
  )
}

export default SearchBar
