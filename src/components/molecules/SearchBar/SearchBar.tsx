import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { height, width, space, colors, fontSize, fontWeight } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { SearchBarContainer } from '../../atoms'

interface Props {
  placeholder: string
}

const SearchBar: React.FC<Props> = ({ placeholder }) => {
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)

  return (
    <SearchBarContainer>
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

          padding: ${space[1]}px ${space[2]}px;

          &::placeholder {
            color: inherit;
            font-size: inherit;
          }
        `}
        animate={{
          paddingLeft: searchIsFocused ? space[2] : space[10],
          transition: transition.primary
        }}
        initial={{
          paddingLeft: space[10]
        }}
        onFocus={() => setSearchIsFocused(true)}
        onBlur={() => setSearchIsFocused(false)}
        type="text"
        placeholder={placeholder}
      />
    </SearchBarContainer>
  )
}

export default SearchBar

// outline: none;
