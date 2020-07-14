import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import { IoIosCloseCircle } from 'react-icons/io'

// Actions
import { emptyMovieDetails } from '../../../../reducer/movieReducer/actions'
import { emptyBookmarkedActiveMovieDetails } from '../../../../reducer/bookmarkedChartReducer/actions'

// Styles
import { buttonStyle, space, handleSize, colors, buttonNoFocus, buttonFocus, zIndex } from '../../../../styles/variables'

interface Props {
  isLeft: boolean
  isBookmarkedChart?: boolean
}

const MovieCardCloseIcon = ({ isLeft, isBookmarkedChart }: Props) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = React.useState(false)
  const [currentInput] = useWhatInput()
  const emptyFunc = isBookmarkedChart ? emptyBookmarkedActiveMovieDetails : emptyMovieDetails

  const horPos = isLeft
    ? css`
        right: -${handleSize - 4}px;
      `
    : css`
        left: -${handleSize - 4}px;
      `
  return (
    <motion.button
      type="button"
      animate={{ scale: isHovered ? 1.25 : 1 }}
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => dispatch(emptyFunc())}
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

MovieCardCloseIcon.defaultProps = {
  isBookmarkedChart: false
}

export default MovieCardCloseIcon
