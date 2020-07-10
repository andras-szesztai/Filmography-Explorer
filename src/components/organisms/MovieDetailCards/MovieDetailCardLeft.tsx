import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/core'

// Components
import MovieDetailCardContent from './MovieDetailCardContent'
import { MovieCardCloseIcon } from '../../atoms'
import MovieCardBookmark from '../../atoms/MovieDetailCardAtoms/MovieCardBookMark/MovieCardBookMark'

// utils
import { handleBookmarkedToggle } from './utils/util'

// Types
import { CombinedState } from '../../../types/state'
import { Params } from './types'

// Styles
import { movieDetailCardContainerLeft } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardLeft = ({ bookmarkedMovies, setBookmarkedMovies, isOpen }: Params) => {
  const {
    activeMovieID,
    activeMovieData: { details, crew, cast }
  } = useSelector((state: CombinedState) => state.movieReducer)
  const dispatch = useDispatch()

  const [isHovered, setIsHovered] = React.useState(false)

  const handleClick = () =>
    handleBookmarkedToggle({
      bookmarkedMovies,
      activeMovieID,
      setBookmarkedMovies,
      cast,
      crew,
      details,
      dispatch
    })

  return (
    <motion.div animate={{ x: isOpen ? width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerLeft}>
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: ${width.movieDetailCardExtra + handleSize}px auto;
          grid-template-areas: 'placeholder content';
        `}
      >
        <MovieCardCloseIcon isLeft />
        <MovieCardBookmark isLeft handleClick={handleClick} setIsHovered={setIsHovered} isHovered={isHovered} />
        <MovieDetailCardContent
          isOpen={isOpen}
          justifyLink="flex-start"
          loaderLeftPos={width.movieDetailCardExtra + handleSize}
          handleClick={handleClick}
          setIsHovered={setIsHovered}
        />
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
