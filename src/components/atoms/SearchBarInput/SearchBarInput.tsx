import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { height, width, space, colors, fontSize, fontWeight } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

interface Props {
  searchIsFocused: boolean
  setSearchIsFocused: (isFocused: boolean) => void
  placeholder: string
  inputValue: string
  setInputText: (text: string) => void
  setResults: (arr: []) => void
  setActiveResult: (index: number) => void
  activeResult: number
  results: any[]
}

const SearchBarInput: React.FC<Props> = ({
  searchIsFocused,
  setSearchIsFocused,
  placeholder,
  inputValue,
  setInputText,
  setResults,
  results,
  setActiveResult,
  activeResult
}) => {
  return (
    <motion.input
      css={css`
        width: ${width.searchBar}px;
        height: ${height.searchBar}px;

        border-radius: ${space[1]}px;
        background: transparent;
        border: 1px solid ${colors.textColorPrimary};

        color: ${colors.textColorPrimary};
        font-size: ${fontSize.md};
        font-weight: ${fontWeight.sm};

        outline: none;

        padding: ${space[1]}px ${space[3]}px;

        &::placeholder {
          color: inherit;
          font-size: inherit;
        }
      `}
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
      onBlur={() => {
        setInputText('')
        setResults([])
        setSearchIsFocused(false)
      }}
      onChange={(e: React.FormEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
        if (results.length) {
          setResults([])
        }
        if (activeResult !== 0) {
          setActiveResult(0)
        }
      }}
    />
  )
}

export default SearchBarInput
