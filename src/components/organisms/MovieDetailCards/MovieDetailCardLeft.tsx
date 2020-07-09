import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

// Types
import { now } from 'lodash'
import { CombinedState } from '../../../types/state'

// Styles
import { MovieDetailCardContainerLeft, MainGridStyle, InfoGrid, MovieTitle, Subtitle } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { Image, TextArea } from '../../atoms'

// Hooks
import { useFetchActiveMovieDetails } from './hooks'

const MovieDetailCardLeft = () => {
  const {
    position,
    activeMovieID,
    mediaType,
    activeMovieData: { details },
    loading
  } = useSelector((state: CombinedState) => state.movieReducer)

  const isOpen = !!activeMovieID && position === 1
  useFetchActiveMovieDetails({ isOpen, activeMovieID, mediaType })

  return (
    <motion.div animate={{ x: isOpen ? width.detailsCard : 0 }} transition={transition.primary} css={MovieDetailCardContainerLeft}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: ${width.movieDetailCardExtra + handleSize}px auto;
          grid-template-areas: 'placeholder content';
        `}
      >
        <div css={MainGridStyle}>
          <div css={InfoGrid}>
            <div css={MovieTitle}>{details.original_title || details.original_name}</div>
            <div css={Subtitle}>
              {mediaType === 'movie' ? 'Release date' : 'First air date'}:&nbsp;
              {format(new Date(details.release_date || details.first_air_date || 0), 'MMM dd, yyyy')}
            </div>
            <TextArea gridArea="" text={details.overview} />
          </div>
          <Image url={details.poster_path} alt={`${details.original_title || details.original_name}-poster`} />
        </div>
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
