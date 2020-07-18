import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { space, zIndex } from '../../../../styles/variables'

const SearchBarContainer: React.FC = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      css={css`
        position: absolute;
        left: ${space[8]}px;
        top: ${space[4]}px;
        z-index: ${zIndex.mainSearchBar};
      `}
    >
      <div
        css={css`
          position: relative;
          cursor: pointer;
        `}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default SearchBarContainer
