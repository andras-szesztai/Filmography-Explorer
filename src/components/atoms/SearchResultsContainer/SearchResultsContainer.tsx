import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/core'

const variants = {
  initial: {
    pointerEvents: 'auto'
  },
  animate: {
    pointerEvents: 'auto',
    transition: {
      staggerChildren: 0.25
    }
  },
  exit: {
    pointerEvents: 'none',
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
}

interface ResultsObj {
  name: string
}

type Props = {
  results: ResultsObj[]
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
