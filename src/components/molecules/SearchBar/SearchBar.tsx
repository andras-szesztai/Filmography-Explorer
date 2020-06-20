import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { height, width, space, colors } from '../../../styles/variables'
import { SearchBarContainer } from '../../atoms'

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <motion.input
        // initial={{
        //   opacity: 0
        // }}
        // animate={{
        //   opacity: 1
        // }}
        type="text"
        css={css`
          width: ${width.searchBar}px;
          height: ${height.searchBar}px;

          border-radius: ${space[1]}px;
          color: ${colors.textColorPrimary};
          background: transparent;
          border: 1px solid ${colors.textColorPrimary};
          &::placeholder {
            font: inherit;
          }
        `}
        placeholder="test"
      />
    </SearchBarContainer>
  )
}

export default SearchBar

// outline: none;
