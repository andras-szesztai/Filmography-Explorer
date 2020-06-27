import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { usePrevious } from 'react-use'

// Styles
import { space, colors, width, height } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

interface Props {
  yPos: number
}

const PersonDetailCardContainer: React.FC<Props> = ({ yPos, children }) => {
  return (
    <motion.div
      initial={{ y: -height.personCardOpen }}
      animate={{ y: yPos }}
      transition={transition.primary}
      css={css`
        position: fixed;

        background-color: ${colors.bgColorSecondary};
        border-radius: 0 0 ${space[1]}px ${space[1]}px;

        right: ${space[8]}px;
        width: ${width.detailsCard}px;
        height: ${height.personCardOpen}px;
        z-index: 5;
        padding: 0 ${space[3]}px ${space[3]}px ${space[3]}px;

        overflow: hidden;
      `}
    >
      {children}
    </motion.div>
  )
}

export default PersonDetailCardContainer
