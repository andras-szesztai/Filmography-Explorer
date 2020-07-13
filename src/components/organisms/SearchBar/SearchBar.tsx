import React from 'react'
import { IoIosSearch, IoIosClose } from 'react-icons/io'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

// Components
import { SearchBarContainer, SearchBarInput, SearchIconContainer, SearchResultsContainer, ActiveSearchResultIndicator } from '../../atoms'
import { SearchResultContent } from '../../molecules'

// Constants
import { API_ROOT } from '../../../constants/url'
import { setActiveNameID } from '../../../reducer/personReducer/actions'

// Hooks
import { useDebouncedSearch } from '../../../hooks'

// Types
import { PersonDetails } from '../../../types/person'

// Styles
import { colors } from '../../../styles/variables'
import { duration } from '../../../styles/animation'
import { CombinedState } from '../../../types/state'
import { emptyMovieDetails } from '../../../reducer/movieReducer/actions'

export interface ResultArray {
  resultArray: PersonDetails[]
}

interface Props {
  placeholder: string
  activeNameID: number
}

const SearchBar = ({ placeholder, activeNameID }: Props) => {
  const dispatch = useDispatch()
  const [nameSearchResults, setNameSearchResults] = React.useState<ResultArray>({ resultArray: [] })
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)
  const [activeResult, setActiveResult] = React.useState(0)
  const [noResult, setNoResult] = React.useState(false)
  const activeMovieID = useSelector((state: CombinedState) => state.movieReducer.activeMovieID)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const fetchNames = (text: string) => {
    if (text) {
      axios
        .get(`${API_ROOT}/search/person?api_key=${process.env.MDB_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`)
        .then(response => {
          if (response.data.total_results) {
            setNameSearchResults({ resultArray: response.data.results.filter((_: {}, i: number) => i < 5) })
          } else {
            setNoResult(true)
          }
        })
        .catch(error => console.log(error))
    } else {
      setNameSearchResults({ resultArray: [] })
    }
  }
  const { inputText, setInputText } = useDebouncedSearch(fetchNames, duration.md)

  const resetSearch = () => {
    setNameSearchResults({ resultArray: [] })
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

  const isResultVisible = !!nameSearchResults.resultArray.length
  return (
    <SearchBarContainer>
      <SearchBarInput
        inputRef={inputRef}
        placeholder={placeholder}
        searchIsFocused={searchIsFocused}
        setSearchIsFocused={setSearchIsFocused}
        setNoResult={setNoResult}
        noResult={noResult}
        inputValue={inputText}
        setInputText={setInputText}
        resultsLength={nameSearchResults.resultArray.length}
        setResults={setNameSearchResults}
        setActiveResult={setActiveResult}
        activeResult={activeResult}
        resetSearch={resetSearch}
        handleResultSelect={(index: number) => {
          const newID = nameSearchResults.resultArray[index].id
          if (activeNameID !== newID) {
            if (activeMovieID) {
              dispatch(emptyMovieDetails())
            }
            dispatch(setActiveNameID(newID))
          }
        }}
      />
      <SearchIconContainer isVisible={!searchIsFocused} isLeft animateProps={{ x: -10, rotateY: -75 }}>
        <IoIosSearch size={22} color={colors.textColorPrimary} />
      </SearchIconContainer>
      <SearchIconContainer isVisible={searchIsFocused} animateProps={{ x: 10, rotateY: 75 }} onClick={resetSearch}>
        <IoIosClose size={22} color={colors.accentSecondary} />
      </SearchIconContainer>
      <ActiveSearchResultIndicator isVisible={isResultVisible} activeResult={activeResult} />
      <SearchResultsContainer isVisible={isResultVisible || noResult}>
        {!noResult &&
          nameSearchResults.resultArray.map((res: PersonDetails, i: number) => (
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
    </SearchBarContainer>
  )
}

export default SearchBar
