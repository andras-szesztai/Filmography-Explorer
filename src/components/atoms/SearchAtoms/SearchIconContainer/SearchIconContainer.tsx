import React from 'react'
import { css } from '@emotion/core'
import { motion, AnimatePresence } from 'framer-motion'
import useWhatInput from 'react-use-what-input'

// Styles
import { space, buttonStyle, buttonNoFocus, buttonFocus } from '../../../../styles/variables'
import { transition, whileHover } from '../../../../styles/animation'

interface Props {
  isVisible: boolean
  animateProps: { x: number; rotateY: number }
  isLeft?: boolean
  onClick?: () => void
}

const SearchIconContainer: React.FC<Props> = ({ isVisible, children, animateProps, isLeft, onClick }) => {
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

  const [currentInput] = useWhatInput()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          role="button"
          css={css`
            position: absolute;
            top: ${space[2]}px;
            ${
              isLeft
                ? css`
                    left: ${space[1]}px;
                  `
                : css`
                    right: ${space[1]}px;
                  `
            }

                ${buttonStyle}
              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
          `}
          variants={variants}
          initial="enter"
          animate="animate"
          exit="exit"
          whileHover={{ ...whileHover, transition: transition.whileHover }}
          transition={transition.primary}
          onClick={onClick}
        >
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default SearchIconContainer
