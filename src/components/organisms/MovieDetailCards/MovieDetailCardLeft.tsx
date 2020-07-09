import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

// Types
import { Props } from './types'

// Styles
import { MovieDetailCardContainerLeft, MainGridStyle } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardLeft = ({ isOpen }: Props) => {
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
        <div css={MainGridStyle} />
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
