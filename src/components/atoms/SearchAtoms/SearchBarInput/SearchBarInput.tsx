import React, { RefObject } from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import chroma from 'chroma-js'

// Types
import { ResultArray } from '../../../organisms/PersonSearchBar/PersonSearchBar'

// Styles
import { height, width, space, colors, fontSize, fontWeight } from '../../../../styles/variables'
import { transition } from '../../../../styles/animation'

const inputStyles = css`
  width: ${width.searchBar}px;
  height: ${height.searchBar}px;

  border-radius: ${space[1]}px;
  background: ${chroma(colors.bgColorPrimary).hex()};
  border: 1px solid ${colors.textColorPrimary};

  color: ${colors.textColorPrimary};
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.sm};
  letter-spacing: 1px;

  outline: none;

  padding: ${space[1]}px ${space[3]}px;

  &::placeholder {
    color: inherit;
    opacity: 1;
    letter-spacing: inherit;
    font-size: inherit;
    user-select: none;
  }
`

interface Props {
  searchIsFocused: boolean
  setSearchIsFocused: (isFocused: boolean) => void
  placeholder: string
  inputValue: string
  setInputText: (text: string) => void
  setResults: (obj: { resultArray: [] }) => void
  setActiveResult: (index: number) => void
  setNoResult: (set: boolean) => void
  noResult: boolean
  resetSearch: () => void
  handleResultSelect: (index: number) => void
  activeResult: number
  resultsLength: number
  inputRef: RefObject<HTMLInputElement>
}

const SearchBarInput = ({
  searchIsFocused,
  setSearchIsFocused,
  placeholder,
  inputValue,
  setInputText,
  setResults,
  resultsLength,
  setActiveResult,
  activeResult,
  resetSearch,
  inputRef,
  handleResultSelect,
  noResult,
  setNoResult
}: Props) => {
  return (
    <motion.input
      ref={inputRef}
      css={inputStyles}
      animate={{
        paddingLeft: searchIsFocused ? space[3] : space[10],
        transition: transition.primary
      }}
      initial={{
        paddingLeft: space[3]
      }}
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onFocus={() => setSearchIsFocused(true)}
      onBlur={resetSearch}
      onChange={(e: React.FormEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        if (noResult) {
          setNoResult(false)
        }
        if (resultsLength) {
          setResults({ resultArray: [] })
        }
        if (activeResult !== 0) {
          setActiveResult(0)
        }
      }}
      onKeyDown={({ keyCode }) => {
        if (keyCode === 38) {
          if (activeResult === 0) {
            setActiveResult(resultsLength - 1)
          } else {
            setActiveResult(activeResult - 1)
          }
        }
        if (keyCode === 40) {
          if (activeResult === resultsLength - 1) {
            setActiveResult(0)
          } else {
            setActiveResult(activeResult + 1)
          }
        }
        if (keyCode === 13) {
          handleResultSelect(activeResult)
          resetSearch()
        }
      }}
    />
  )
}

export default SearchBarInput
