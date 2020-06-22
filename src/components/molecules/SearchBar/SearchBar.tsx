import React from 'react'
import { IoIosSearch, IoIosClose } from 'react-icons/io'
import axios from 'axios'
import { useDispatch } from 'react-redux'

// Components
import { SearchBarContainer, SearchBarInput, SearchIconContainer, SearchResultsContainer, ActiveSearchResultIndicator } from '../../atoms'
import { SearchResultContent } from '..'

// Constants
import { API_ROOT } from '../../../constants/url'
import { setActiveNameID } from '../../../reducer/personReducer/actions'

// Types
import { PersonDetails } from '../../../types/person'

// Styles
import { colors } from '../../../styles/variables'
import { duration } from '../../../styles/animation'
import { useDebouncedSearch } from '../../../hooks'

export interface ResultArray {
  resultArray: PersonDetails[]
}

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const dispatch = useDispatch()
  const [nameSearchResults, setNameSearchResults] = React.useState<ResultArray>({ resultArray: [] })
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)
  const [activeResult, setActiveResult] = React.useState(0)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const fetchNames = (text: string) => {
    if (text) {
      axios
        .get(`${API_ROOT}/search/person?api_key=${process.env.MDB_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`)
        .then(response => {
          setNameSearchResults({ resultArray: response.data.results.filter((el: {}, i: number) => i < 5) })
        })
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
  }

  return (
    <SearchBarContainer>
      <SearchBarInput
        placeholder={placeholder}
        searchIsFocused={searchIsFocused}
        setSearchIsFocused={setSearchIsFocused}
        inputValue={inputText}
        setInputText={setInputText}
        resultsLength={nameSearchResults.resultArray.length}
        setResults={setNameSearchResults}
        setActiveResult={setActiveResult}
        activeResult={activeResult}
        resetSearch={resetSearch}
        inputRef={inputRef}
        handleResultSelect={(index: number) => dispatch(setActiveNameID(nameSearchResults.resultArray[index].id))}
      />
      <SearchIconContainer isVisible={!searchIsFocused} isLeft animateProps={{ x: -10, rotateY: -75 }}>
        <IoIosSearch size={22} color={colors.textColorPrimary} />
      </SearchIconContainer>
      <SearchIconContainer isVisible={searchIsFocused} animateProps={{ x: 10, rotateY: 75 }} onClick={resetSearch}>
        <IoIosClose size={22} color={colors.accentPrimary} />
      </SearchIconContainer>
      <ActiveSearchResultIndicator isVisible={!!nameSearchResults.resultArray.length} activeResult={activeResult} />
      <SearchResultsContainer isVisible={!!nameSearchResults.resultArray.length}>
        {nameSearchResults.resultArray.map((res: PersonDetails, i: number) => (
          <SearchResultContent
            key={res.id}
            zIndex={Math.abs(i - 4)}
            data={res}
            handleClick={() => {
              dispatch(setActiveNameID(res.id))
              resetSearch()
            }}
            handleMouseover={() => {
              setActiveResult(i)
            }}
          />
        ))}
      </SearchResultsContainer>
    </SearchBarContainer>
  )
}

export default SearchBar
