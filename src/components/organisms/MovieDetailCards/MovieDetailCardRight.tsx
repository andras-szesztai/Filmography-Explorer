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

// Utils
import { handleBookmarkedToggle } from './utils/util'

// Styles
import { movieDetailCardContainerRight, rightTopHandleStyle } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardRight = ({
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
  const isOpen = !!activeMovieID && position === 0

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
      animate={{ x: isOpen ? -width.detailsCard : 0 }}
      transition={transition.primary}
      css={css`
        ${movieDetailCardContainerRight}
        ${!isBookmarkedChart && rightTopHandleStyle}
      `}
    >
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
        {!isBookmarkedChart && (
          <MovieCardBookmark isLeft={false} handleClick={handleClick} setIsHovered={setIsHovered} isHovered={isHovered} />
        )}
        <MovieCardCloseIcon isLeft={false} />
        <MovieDetailCardContent
          isOpen={isOpen}
          justifyLink="flex-end"
          loaderLeftPos={0}
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

export default MovieDetailCardRight
