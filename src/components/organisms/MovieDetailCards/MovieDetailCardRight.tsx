import React from 'react'
import { motion } from 'framer-motion'

// Types

// Styles
import { movieDetailCardContainerRight } from './styles'
import { width } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardRight = () => {
  return <motion.div animate={{ x: false ? -width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerRight} />
}

export default MovieDetailCardRight
