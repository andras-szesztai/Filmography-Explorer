import React from 'react'
import { IoIosSearch, IoIosCloseCircle, IoIosFilm, IoMdPerson } from 'react-icons/io'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import { AnimateSharedLayout, motion } from 'framer-motion'

// Components
import { SearchBarContainer, SearchBarInput, SearchIconContainer, SearchResultsContainer, ActiveSearchResultIndicator } from '../../atoms'
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
import { colors, width, height, space, buttonStyle, buttonNoFocus, buttonFocus } from '../../../styles/variables'
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
  const [nameSearchResults, setNameSearchResults] = React.useState<ResultArray>({ resultArray: [] })
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)
  const [activeResult, setActiveResult] = React.useState(0)
  const [noResult, setNoResult] = React.useState(false)
  const activeMovieID = useSelector((state: CombinedState) => state.movieReducer.activeMovieID)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [currentInput] = useWhatInput()

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

  const [isPersonSearch, setIsPersonSearch] = React.useState(true)

  const isResultVisible = !!nameSearchResults.resultArray.length
  return (
    <SearchBarContainer>
      <div
        css={css`
          position: absolute;
          left: ${width.searchBar + space[4]}px;
          height: ${height.searchBar}px;
          width: ${space[17]}px;
          color: ${colors.bgColorSecondary};
          border: 1px solid ${colors.textColorPrimary};
          border-radius: ${space[1]}px;

          cursor: default;

          display: flex;

          align-items: center;

          overflow: hidden;
        `}
      >
        <AnimateSharedLayout>
          <button
            type="button"
            onClick={() => setIsPersonSearch(false)}
            css={css`
              ${buttonStyle}
              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
              color: ${colors.textColorPrimary};
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              height: 100%;
              width: 50%;
            `}
          >
            <motion.span
              css={css`
                z-index: 2;
              `}
            >
              <IoIosFilm size={24} />
            </motion.span>
            {!isPersonSearch && (
              <motion.div
                layoutId="outline"
                css={css`
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  background: red;
                  border-radius: ${space[1]}px;
                  top: 0px;
                  left: 0px;
                  z-index: 1;
                `}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsPersonSearch(true)}
            css={css`
              ${buttonStyle}
              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
              color: ${colors.textColorPrimary};
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              height: 100%;
                        width: 50%;
            `}
          >
            <span
              css={css`
                z-index: 2;
              `}
            >
              <IoMdPerson size={22} />
            </span>
            {isPersonSearch && (
              <motion.div
                layoutId="outline"
                css={css`
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  background: red;
                  border-radius: ${space[1]}px;
                  top: 0px;
                  left: 0px;
                  z-index: 1;
                `}
              />
            )}
          </button>
        </AnimateSharedLayout>
      </div>
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
          const newID = nameSearchResults.resultArray[index] && nameSearchResults.resultArray[index].id
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
