import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/core'
import chroma from 'chroma-js'

// Styles
import { space, zIndex, colors, height } from '../../../../styles/variables'
import { transition } from '../../../../styles/animation'

type Props = {
  isVisible: boolean
  activeResult: number
}

const ActiveSearchResultIndicator = ({ isVisible, activeResult }: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={css`
            position: absolute;
            z-index: ${zIndex.searchResultHover};
            height: ${height.searchResultHoverHeight}px;
            width: 100%;
            border-radius: ${space[1]}px;
            pointer-events: none;
            background-color: ${chroma(colors.bgColorSecondary)
              .alpha(0.2)
              .hex()};
            border: 1px solid ${colors.bgColorSecondary};
          `}
          initial={{ opacity: 0 }}
          animate={{ y: space[1] + activeResult * height.searchResultHoverHeight, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition.primary}
        />
      )}
    </AnimatePresence>
  )
}

export default ActiveSearchResultIndicator
