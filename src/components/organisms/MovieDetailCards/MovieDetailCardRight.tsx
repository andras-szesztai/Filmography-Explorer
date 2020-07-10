import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/core'

// Components
import MovieDetailCardContent from './MovieDetailCardContent'
import MovieCardBookmark from '../../atoms/MovieDetailCardAtoms/MovieCardBookMark/MovieCardBookMark'
import { MovieCardCloseIcon } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'
import { Params } from './types'

// Styles
import { movieDetailCardContainerRight } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { handleBookmarkedToggle } from './utils/util'

const MovieDetailCardRight = ({ bookmarkedMovies, setBookmarkedMovies, isOpen }: Params) => {
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
    <motion.div animate={{ x: isOpen ? -width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerRight}>
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: auto ${width.movieDetailCardExtra + handleSize}px;
          grid-template-areas: 'content placeholder';
        `}
      >
        <MovieCardBookmark isLeft={false} handleClick={handleClick} setIsHovered={setIsHovered} isHovered={isHovered} />
        <MovieCardCloseIcon isLeft={false} />
        <MovieDetailCardContent
          isOpen={isOpen}
          handleClick={handleClick}
          setIsHovered={setIsHovered}
          justifyLink="flex-end"
          loaderLeftPos={0}
        />
      </div>
    </motion.div>
  )
}

export default MovieDetailCardRight
