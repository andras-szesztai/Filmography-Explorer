import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import MovieDetailCardContent from './MovieDetailCardContent'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { movieDetailCardContainerLeft } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardLeft = () => {
  const { position, activeMovieID } = useSelector((state: CombinedState) => state.movieReducer)

  const isOpen = !!activeMovieID && position === 1

  return (
    <motion.div animate={{ x: isOpen ? width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerLeft}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: ${width.movieDetailCardExtra + handleSize}px auto;
          grid-template-areas: 'placeholder content';
        `}
      >
        <MovieDetailCardContent isOpen={isOpen} justifyLink="flex-start" loaderLeftPos={width.movieDetailCardExtra + handleSize} />
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
