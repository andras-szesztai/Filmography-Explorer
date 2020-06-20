import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { height, width, space, colors, fontSize } from '../../../styles/variables'
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
          background: transparent;
          border: 1px solid ${colors.textColorPrimary};

          color: ${colors.textColorPrimary};
          font-size: ${fontSize.md};

          outline: none;

          padding: ${space[1]}px ${space[2]}px;

          &::placeholder {
            color: inherit;
            font-size: inherit;
          }
        `}
        placeholder="test"
      />
    </SearchBarContainer>
  )
}

export default SearchBar

// outline: none;
