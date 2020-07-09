import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

// Components
import MovieDetailCardContent from './MovieDetailCardContent'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { movieDetailCardContainerLeft } from './styles'
import { width } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardLeft = () => {
  const { position, activeMovieID, loading } = useSelector((state: CombinedState) => state.movieReducer)

  const isOpen = !!activeMovieID && position === 1

  return (
    <motion.div animate={{ x: isOpen ? width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerLeft}>
      <MovieDetailCardContent isOpen={isOpen} />
    </motion.div>
  )
}

export default MovieDetailCardLeft
