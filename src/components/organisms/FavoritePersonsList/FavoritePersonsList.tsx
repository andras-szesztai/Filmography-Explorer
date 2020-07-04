import React from 'react'
import { css } from '@emotion/core'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useMeasure } from 'react-use'
import { useSelector } from 'react-redux'

// Types
import { CombinedState } from '../../../types/state'

// Helpers
import { getObjectValues } from '../../../utils/dataHelpers'

// Styles
import { space, colors } from '../../../styles/variables'
import { FavoritePersonsListItem } from '../../molecules'
import { ScrollableContainerStyle, ContainerStyle } from './style'

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

  const favs = getObjectValues(personReducer.favorites).map(({ name, id }) => ({ name, id }))

  return (
    <div css={ContainerStyle}>
      <div
        css={css`
          display: flex;
          align-items: center;
          color: ${colors.textColorSecondary};
        `}
      >
        My recent favorites
      </div>
      <div
        ref={ref}
        css={css`
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
        `}
      >
        <AnimateSharedLayout>
          <motion.div
            css={css`
              width: ${width}px;
              ${ScrollableContainerStyle}
            `}
          >
            <AnimatePresence>
              {favs.length &&
                [...favs].reverse().map(({ name, id }) => (
                  <motion.span key={`${id}-favlist`} animate>
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
                color: ${colors.textColorSecondary};
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Please start the list by marking a person as your favorite
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FavoritePersonsList