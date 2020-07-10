import React from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import { IoIosCloseCircle } from 'react-icons/io'
import useWhatInput from 'react-use-what-input'

// Components
import { useLocalStorage } from 'react-use'
import MovieDetailCardContent from './MovieDetailCardContent'
import { MovieCardCloseIcon, BookmarkIcon } from '../../atoms'
import MovieCardBookmark from '../../atoms/MovieDetailCardAtoms/MovieCardBookMark/MovieCardBookMark'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { movieDetailCardContainerLeft } from './styles'
import { width, handleSize, colors, buttonStyle, buttonNoFocus, buttonFocus, space, zIndex } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { emptyMovieDetails } from '../../../reducer/movieReducer/actions'
import { LOCAL_STORE_ACCESSORS } from '../../../constants/accessors'
import { handleBookmarkedToggle } from './utils/util'
import { BookmarkedMoviesObject } from '../../../types/movie'

const MovieDetailCardLeft = () => {
  const {
    position,
    activeMovieID,
    activeMovieData: { details, crew, cast }
  } = useSelector((state: CombinedState) => state.movieReducer)
  const dispatch = useDispatch()

  const isOpen = !!activeMovieID && position === 1
  const [isHovered, setIsHovered] = React.useState(false)

  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorage(LOCAL_STORE_ACCESSORS.bookmarkedMovies, {} as BookmarkedMoviesObject)

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
