import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/core'

const variants = {
  animate: {
    transition: {
      staggerChildren: 0.25
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
  results: {}[]
}

const SearchResultsContainer: React.FC<Props> = ({ results, children }) => {
  return (
    <AnimatePresence>
      {results.length && (
        <motion.div
          css={css`
            position: absolute;
            padding-top: 35px;
            top: 10px;
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            z-index: -1;
            pointer-events: ${results.length ? 'all' : 'none'};
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
