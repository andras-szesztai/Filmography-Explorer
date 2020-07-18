import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'

// Styles
import { buttonStyle, space, handleSize, buttonNoFocus, buttonFocus, zIndex } from '../../../../styles/variables'
import BookmarkIcon from '../../BookmarkIcon/BookmarkIcon'
import { CombinedState } from '../../../../types/state'

interface Params {
  isLeft: boolean
  handleClick: () => void
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
  isHovered: boolean
  activeMovieID: number
}

const MovieCardBookmark = ({ isLeft, handleClick, setIsHovered, isHovered, activeMovieID }: Params) => {
  const { bookmarks } = useSelector((state: CombinedState) => state.movieReducer)
  const [currentInput] = useWhatInput()

  const horPos = isLeft
    ? css`
        right: 12px;
      `
    : css`
        left: -454px;
      `

  return (
    <button
      type="button"
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => handleClick()}
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
        initial={{ originX: 0.5 }}
        animate={{ scale: isHovered ? 1.15 : 1 }}
        css={css`
          position: absolute;
          ${horPos}
          top: 4px;
        `}
      >
        <BookmarkIcon isHovered={isHovered} isBookmarked={!!bookmarks[activeMovieID]} />
      </motion.span>
    </button>
  )
}

export default MovieCardBookmark
