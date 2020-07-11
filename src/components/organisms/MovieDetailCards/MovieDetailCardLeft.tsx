import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import MovieDetailCardContent from './MovieDetailCardContent'
import { MovieCardCloseIcon } from '../../atoms'
import MovieCardBookmark from '../../atoms/MovieDetailCardAtoms/MovieCardBookMark/MovieCardBookMark'

// utils
import { handleBookmarkedToggle } from './utils/util'

// Types
import { Params } from './types'
import { CombinedState } from '../../../types/state'

// Styles
import { movieDetailCardContainerLeft, leftTopHandleStyle } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardLeft = ({
  bookmarkedMovies,
  setBookmarkedMovies,
  activeNameID,
  genreFilter,
  mediaType,
  loading,
  activeMovieData,
  isBookmarkedChart
}: Params) => {
  const dispatch = useDispatch()
  const { bookmarkedChartReducer, movieReducer } = useSelector((state: CombinedState) => state)

  const activeMovieID = isBookmarkedChart ? bookmarkedChartReducer.bookmarkedActiveMovie.id : movieReducer.activeMovieID

  const position = isBookmarkedChart ? bookmarkedChartReducer.bookmarkedActiveMovie.position : movieReducer.position

  const [isHovered, setIsHovered] = React.useState(false)
  const isOpen = !!activeMovieID && position === 1

  const handleClick = () =>
    handleBookmarkedToggle({
      bookmarkedMovies,
      activeMovieID,
      setBookmarkedMovies,
      cast: activeMovieData.cast,
      crew: activeMovieData.crew,
      details: activeMovieData.details,
      dispatch,
      mediaType
    })

  return (
    <motion.div
      animate={{ x: isOpen ? width.detailsCard : 0 }}
      transition={transition.primary}
      css={css`
        ${movieDetailCardContainerLeft}
        ${!isBookmarkedChart && leftTopHandleStyle}
      `}
    >
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
        {!isBookmarkedChart && <MovieCardBookmark isLeft handleClick={handleClick} setIsHovered={setIsHovered} isHovered={isHovered} />}
        <MovieDetailCardContent
          isOpen={isOpen}
          justifyLink="flex-start"
          loaderLeftPos={width.movieDetailCardExtra + handleSize}
          handleClick={handleClick}
          setIsHovered={setIsHovered}
          activeNameID={activeNameID}
          genreFilter={genreFilter}
          activeMovieID={activeMovieID}
          mediaType={mediaType}
          activeMovieData={activeMovieData}
          loading={loading}
        />
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
