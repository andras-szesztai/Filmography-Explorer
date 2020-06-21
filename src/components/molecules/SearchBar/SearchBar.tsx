import React from 'react'
import { IoIosSearch, IoIosClose } from 'react-icons/io'
import axios from 'axios'

// Components
import { SearchBarContainer, SearchBarInput, SearchIconContainer, SearchResultsContainer, ActiveSearchResultIndicator } from '../../atoms'
import { SearchResultContent } from '..'

// Styles
import { colors } from '../../../styles/variables'
import { duration } from '../../../styles/animation'
import { useDebouncedSearch } from '../../../hooks'

// Constants
import { API_ROOT } from '../../../constants/url'

interface Props {
  placeholder: string
}

export interface ResultData {
  id: number
  profile_path: string
  name: string
  known_for_department: string
}

const SearchBar: React.FC<Props> = ({ placeholder }) => {
  const [nameSearchResults, setNameSearchResults] = React.useState([])
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)
  const [activeResult, setActiveResult] = React.useState(0)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const fetchNames = (text: string) => {
    if (text) {
      axios
        .get(`${API_ROOT}/search/person?api_key=${process.env.MDB_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`)
        .then(response => {
          setNameSearchResults(response.data.results.filter((el: {}, i: number) => i < 5))
        })
        .catch(error => console.log(error))
    } else {
      setNameSearchResults([])
    }
  }
  const { inputText, setInputText } = useDebouncedSearch(fetchNames, duration.md)

  const resetSearch = () => {
    setNameSearchResults([])
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
        resultsLength={nameSearchResults.length}
        setResults={setNameSearchResults}
        setActiveResult={setActiveResult}
        activeResult={activeResult}
        resetSearch={resetSearch}
        inputRef={inputRef}
      />
      <SearchIconContainer isVisible={!searchIsFocused} isLeft animateProps={{ x: -10, rotateY: -75 }}>
        <IoIosSearch size={22} color={colors.textColorPrimary} />
      </SearchIconContainer>
      <SearchIconContainer isVisible={searchIsFocused} animateProps={{ x: 10, rotateY: 75 }} onClick={resetSearch}>
        <IoIosClose size={22} color={colors.accentPrimary} />
      </SearchIconContainer>
      <ActiveSearchResultIndicator isVisible={!!nameSearchResults.length} activeResult={activeResult} />
      <SearchResultsContainer isVisible={!!nameSearchResults.length}>
        {nameSearchResults.map((res: ResultData, i: number) => (
          <SearchResultContent
            key={res.id}
            zIndex={Math.abs(i - 4)}
            data={res}
            handleClick={() => {
              // handleResultSelect(res.id) // set active name id
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
