import React from 'react'
import { motion } from 'framer-motion'

// Types
import { Props } from './types'

// Styles
import { MovieDetailCardContainerRight } from './styles'
import { width } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardRight = ({ isOpen }: Props) => {
  return <motion.div animate={{ x: isOpen ? -width.detailsCard : 0 }} transition={transition.primary} css={MovieDetailCardContainerRight} />
}

export default MovieDetailCardRight
