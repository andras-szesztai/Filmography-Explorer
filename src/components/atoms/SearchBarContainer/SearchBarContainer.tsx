import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { space, colors, fontSize, fontWeight, zIndex } from '../../../styles/variables'

const SearchBarContainer: React.FC = ({ children }) => {
  return (
    <motion.div
      css={css`
        position: absolute;
        left: ${space[2]}px;
        top: ${space[2]}px;
        z-index: ${zIndex.mainSearchBar};
      `}
    >
      <motion.div
        css={css`
          position: relative;
          cursor: pointer;
        `}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default SearchBarContainer

// export const SearchBarMainContainer = styled.div`
//   position: fixed;
//   left: ${space[2]}px;
//   top: ${space[2]}px;
//   z-index: ${({z}) => z};
// `

// export const SearchBarSubContainer = styled(motion.div)`
//   position: relative;
//   cursor: pointer;
//   z-index: ${({z}) => z};
// `
