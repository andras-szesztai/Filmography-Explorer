import React from 'react'

import { css } from '@emotion/core'
import { motion, AnimatePresence } from 'framer-motion'

// Styles
import { space } from '../../../styles/variables'

interface Props {
  isVisible: boolean
  animateProps: { x: number; rotateY: number }
  isLeft: boolean
}

const SearchIconContainer: React.FC<Props> = ({ isVisible, children, animateProps, right, isLeft }) => {
  const variants = {
    initial: {
      rotateY: 0,
      x: 0,
      opacity: 1
    },
    animate: {
      opacity: 1,
      ...animateProps
    },
    exit: {
      rotateY: 0,
      x: 0,
      opacity: 1
    }
  }
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          role="button"
          css={css`
            position: absolute;
            top: ${space[2]}px;
            ${isLeft
              ? css`
                  left: ${space[2]}px;
                `
              : css`
                  right: ${space[2]}px;
                `}

            background: transparent;

            cursor: pointer;
          `}
          variants={variants}
          initial="enter"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default SearchIconContainer

// export const SearchIconContainer = styled(motion.div)`
//   position: absolute;
//   top: ${space[2]}px;
//   left: ${space[2]}px;
//   cursor: default;
//   z-index: ${({ z }) => z + 1};
// `
