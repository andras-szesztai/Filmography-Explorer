import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'

// Styles
import { buttonStyle, space, handleSize, buttonNoFocus, buttonFocus, zIndex } from '../../../../styles/variables'
import BookmarkIcon from '../../BookmarkIcon/BookmarkIcon'

interface Params {
  isLeft: boolean
  handleClick: () => void
}

const MovieCardBookmark = ({ isLeft, handleClick }: Params) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = React.useState(false) // TODO: move it up to  hover on title too
  const [isFavorited, setIsFavorited] = React.useState(false)
  const [currentInput] = useWhatInput()

  const horPos = isLeft
    ? css`
        right: 6px;
      `
    : css`
        left: -458px;
      `
  return (
    <button
      type="button"
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={({ keyCode }) => {
        if (keyCode === 13) {
          handleClick()
        }
      }}
      css={css`
        ${buttonStyle}
        position: absolute;
        top: ${space[1]}px;
        right: -${handleSize - 2}px;
        z-index: ${zIndex.chartTooltip};

        width: ${space[9]}px;
        height: ${space[9]}px;

        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      <motion.span
        initial={{ originX: 0.5, scale: 1 }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        css={css`
          position: absolute;
          ${horPos}
          top: 2px;
        `}
      >
        <BookmarkIcon isHovered={isHovered} isFavorited={isFavorited} />
      </motion.span>
    </button>
  )
}

export default MovieCardBookmark
