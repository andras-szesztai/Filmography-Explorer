import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

// Styles
import { space, colors, width, height } from '../../../styles/variables'

const PersonDetailCardContainer: React.FC = ({ children }) => {
  return (
    <motion.div
      // initial="initial"
      // animate={animateCard}
      // exit="exit"
      // variants={variants}
      css={css`
        position: fixed;

        background-color: ${colors.bgColorSecondary};
        border-radius: ${space[1]}px;

        right: ${space[2]}px;
        width: ${width.detailsCard}px;
        height: ${height.personCard}px;
        z-index: 5;
      `}
    >
      {children}
    </motion.div>
  )
}

export default PersonDetailCardContainer
