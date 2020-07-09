import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import MovieDetailCardContent from './MovieDetailCardContent'
import { MovieCardCloseIcon } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { movieDetailCardContainerRight } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardRight = () => {
  const { position, activeMovieID } = useSelector((state: CombinedState) => state.movieReducer)

  const isOpen = !!activeMovieID && position === 0

  return (
    <motion.div animate={{ x: isOpen ? -width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerRight}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: auto ${width.movieDetailCardExtra + handleSize}px;
          grid-template-areas: 'content placeholder';
        `}
      >
        <MovieCardCloseIcon isLeft={false} />
        <MovieDetailCardContent isOpen={isOpen} justifyLink="flex-end" loaderLeftPos={0} />
      </div>
    </motion.div>
  )
}

export default MovieDetailCardRight
