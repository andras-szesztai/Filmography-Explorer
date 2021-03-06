import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@emotion/core'
import ContentLoader from 'react-content-loader'

// Styles
import { height, width, colors } from '../../../../styles/variables'

interface Props {
  loading: boolean
  isOpen: boolean
}

const PersonDetailContentLoader = ({ loading, isOpen }: Props) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={css`
            position: absolute;
            top: ${height.personCardExtra}px;
            left: 0;
            z-index: 1;
          `}
        >
          <ContentLoader
            speed={2}
            width={width.detailsCard}
            height={height.personCardOpen - height.personCardExtra}
            backgroundColor={colors.bgColorSecondaryDark}
            foregroundColor={colors.bgColorPrimary}
          >
            {isOpen && (
              <>
                <rect x="12" y="14" rx="4" ry="4" width="255" height="165" />
                <rect x="280" y="14" rx="4" ry="4" width="110" height="165" />
              </>
            )}
            <rect x="12" y="188" rx="4" ry="4" width="320" height="41" />
          </ContentLoader>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PersonDetailContentLoader
