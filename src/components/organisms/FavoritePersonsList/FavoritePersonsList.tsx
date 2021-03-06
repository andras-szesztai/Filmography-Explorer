import React from 'react'
import { css } from '@emotion/core'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useMeasure } from 'react-use'
import { useSelector } from 'react-redux'

// Components
import { FavoriteStar } from '../../atoms'
import { FavoritePersonsListItem } from '../../molecules'

// Types
import { CombinedState } from '../../../types/state'

// Helpers
import { getObjectValues } from '../../../utils/dataHelpers'

// Styles
import { space, colors, fontWeight } from '../../../styles/variables'
import { ScrollableContainerStyle, ContainerStyle } from './style'
import { delay } from '../../../styles/animation'

const PlaceHolder = () => {
  return (
    <div
      css={css`
        opacity: 0;
        padding: ${space[1]}px;
        pointer-events: none;
      `}
    />
  )
}

const FavoritePersonsList = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>()
  const personReducer = useSelector((state: CombinedState) => state.personReducer)

  const favs = getObjectValues(personReducer.favorites)

  return (
    <div css={ContainerStyle}>
      <div
        css={css`
          display: flex;
          align-items: center;
          color: ${colors.textColorPrimary};
          font-weight: ${fontWeight.sm};
        `}
      >
        My recent favorites
      </div>
      <motion.div
        ref={ref}
        css={css`
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: delay.xs } }}
      >
        <AnimateSharedLayout>
          <motion.div
            css={css`
              width: ${width}px;
              ${ScrollableContainerStyle}
            `}
            layout
          >
            <AnimatePresence>
              {favs.length &&
                [...favs]
                  .filter((_, i) => i < 20)
                  .sort((a, b) => new Date(b.dateFavorited).getTime() - new Date(a.dateFavorited).getTime())
                  .map(({ name, id }) => (
                    <motion.span key={`${id}-favlist`} layout>
                      <FavoritePersonsListItem text={name} id={id} activeID={personReducer.activeNameID} />
                    </motion.span>
                  ))}
            </AnimatePresence>
            <PlaceHolder />
          </motion.div>
        </AnimateSharedLayout>
        <AnimatePresence>
          {!favs.length && (
            <motion.div
              css={css`
                padding-left: ${space[4]}px;
                color: ${colors.textColorPrimary};
                display: flex;
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Please start the list by marking a person as your favorite{' '}
              <span
                css={css`
                  position: relative;
                `}
              >
                <span
                  css={css`
                    position: absolute;
                    top: -8px;
                  `}
                >
                  <FavoriteStar isFavorited isHovered={false} />
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default FavoritePersonsList
