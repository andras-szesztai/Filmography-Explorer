import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

import { space, colors } from '../../../styles/variables'

interface Props {
  isHovered: boolean
}

const ButtonHoverOverlay: React.FC<Props> = ({ children, isHovered }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      css={css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: ${space[1]}px ${space[2]}px;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: ${colors.bgColorPrimary};
        border-radius: ${space[1]}px;

        pointer-events: none;
      `}
    >
      {children}
    </motion.div>
  )
}

export default ButtonHoverOverlay
