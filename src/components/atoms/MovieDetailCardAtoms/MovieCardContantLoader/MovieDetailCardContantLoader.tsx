import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ContentLoader from 'react-content-loader'
import { css } from '@emotion/core'

import { width, height, colors } from '../../../../styles/variables'

interface Props {
  loading: boolean
  loaderLeftPos: number
}

const MovieDetailCardContantLoader = ({ loading, loaderLeftPos }: Props) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={css`
            position: absolute;
            top: 0px;
            left: ${loaderLeftPos}px;
            z-index: 1;
          `}
        >
          <ContentLoader
            speed={2}
            width={width.detailsCard}
            height={height.movieCard}
            backgroundColor={colors.bgColorSecondaryDark}
            foregroundColor={colors.bgColorPrimary}
          >
            <rect x="12" y="12" rx="4" ry="4" width="205" height="171" />
            <rect x="228" y="12" rx="4" ry="4" width="120" height="171" />
            <rect x="12" y="225" rx="4" ry="4" width="336" height="38" />
            <rect x="12" y="308" rx="4" ry="4" width="336" height="38" />
            <rect x="12" y="390" rx="4" ry="4" width="336" height="38" />
          </ContentLoader>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MovieDetailCardContantLoader
