import React from 'react'
import { css } from '@emotion/core'
import { motion, AnimatePresence } from 'framer-motion'

// Styles
import { space, colors } from '../../../styles/variables'
import { transition, whileHover } from '../../../styles/animation'

interface Props {
  isVisible: boolean
  animateProps: { x: number; rotateY: number }
  isLeft?: boolean
}

const SearchIconContainer: React.FC<Props> = ({ isVisible, children, animateProps, isLeft }) => {
  const variants = {
    enter: {
      ...animateProps,
      opacity: 0
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      x: 0
    },
    exit: {
      ...animateProps,
      opacity: 0
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
                  left: ${space[1]}px;
                `
              : css`
                  right: ${space[1]}px;
                `}

            background: transparent;

            cursor: pointer;

            background: transparent;
            border: none;

            user-select: none;
            border-radius: ${space[1]}px;

            :focus {
              box-shadow: 0 0 0 1px ${colors.accentPrimary};
              outline: none;
            }
          `}
          variants={variants}
          initial="enter"
          animate="animate"
          exit="exit"
          whileHover={{ ...whileHover, transition: transition.whileHover }}
          transition={transition.primary}
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
