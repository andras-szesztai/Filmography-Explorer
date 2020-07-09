import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import { IoIosCloseCircle } from 'react-icons/io'

// Actions
import { emptyMovieDetails } from '../../../../reducer/movieReducer/actions'

// Styles
import { buttonStyle, space, handleSize, colors, buttonNoFocus, buttonFocus, zIndex } from '../../../../styles/variables'

const MovieCardCloseIcon = ({ isLeft }: { isLeft: boolean }) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = React.useState(false)
  const [currentInput] = useWhatInput()

  const horPos = isLeft
    ? css`
        right: -${handleSize}px;
      `
    : css`
        left: -${handleSize}px;
      `
  return (
    <motion.button
      type="button"
      animate={{ scale: isHovered ? 1.25 : 1 }}
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => dispatch(emptyMovieDetails())}
      onKeyDown={({ keyCode }) => {
        if (keyCode === 13) {
          dispatch(emptyMovieDetails())
        }
      }}
      css={css`
        ${buttonStyle}
        position: absolute;
        bottom: ${space[1]}px;
        ${horPos}
        z-index: ${zIndex.chartTooltip};

        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      <IoIosCloseCircle size={28} color={colors.textColorSecondary} />
    </motion.button>
  )
}

export default MovieCardCloseIcon
