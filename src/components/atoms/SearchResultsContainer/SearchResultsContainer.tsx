import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/core'
import { height, space } from '../../../styles/variables'

const variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
}

type Props = {
  isVisible: boolean
}

const SearchResultsContainer: React.FC<Props> = ({ isVisible, children }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={css`
            position: absolute;
            top: ${height.searchBar}px;
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            pointer-events: ${isVisible ? 'all' : 'none'};

            overflow: hidden;
            padding-bottom: ${space[1]}px;
            padding-top: ${space[1]}px;
          `}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchResultsContainer
