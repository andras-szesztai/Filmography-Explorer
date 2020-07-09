import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { MovieDetailCardContainerLeft, MainGridStyle, InfoGrid } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { Image } from '../../atoms'

// Hooks
import { useFetchActiveMovieDetails } from './hooks'

const MovieDetailCardLeft = () => {
  const { position, activeMovieID, mediaType, activeMovieData } = useSelector((state: CombinedState) => state.movieReducer)

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
            <div>Title</div>
            <div>Info</div>
          </div>
          <Image url={activeMovieData.details.poster_path} alt={`${activeMovieData.details.original_title}-poster`} />
        </div>
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
