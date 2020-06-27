/* eslint-disable react/button-has-type */

import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import { IoIosArrowUp } from 'react-icons/io'
import { PersonDetailCardContainer } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'
import { space, height, colors, buttonStyle, dropShadow, width, zIndex } from '../../../styles/variables'

const PersonDetailCard = () => {
  const personDetails = useSelector((state: CombinedState) => state.personReducer.dataSets.details)

  const [isOpen, setIsOpen] = React.useState(true)
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <>
      <div
        css={css`
          position: fixed;

          background: ${colors.bgColorPrimary};

          width: ${space[8]}px;
          height: ${space[8]}px;

          z-index: ${zIndex.headerShadow + 1};

          top: ${height.header}px;
          right: ${space[8] + width.detailsCard}px;
        `}
      />
      <div
        css={css`
          position: fixed;

          background: ${colors.bgColorPrimary};

          width: ${space[8]}px;
          height: ${space[8]}px;

          z-index: ${zIndex.headerShadow + 1};

          top: ${height.header}px;
          right: 0px;
        `}
      />
      <div
        css={css`
          position: fixed;
          filter: drop-shadow(${dropShadow.header.primary}) drop-shadow(${dropShadow.header.secondary})
            drop-shadow(${dropShadow.header.ternary});

          background: ${colors.bgColorSecondary};

          width: ${width.detailsCard + space[8]}px;
          height: ${height.personCardExtra}px;

          z-index: ${zIndex.headerShadow};

          top: ${height.header - height.personCardExtra}px;
          right: ${space[4]}px;
        `}
      />
      <PersonDetailCardContainer isPopulated={!!personDetails} isOpen={isOpen}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: personDetails ? 1 : 0, transition: { delay: 0.8 } }}
          css={css`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: ${space[3]}px;
            place-items: center;
            grid-template-rows: ${height.personCardExtra}px 1fr ${height.personCardClosed}px;
            grid-template-areas:
              '. . .'
              'bio bio photo'
              'icon name name';

            width: 100%;
            height: 100%;
          `}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            css={css`
              display: flex;
              align-items: center;
              grid-area: icon;
              cursor: pointer;

              place-self: end start;

              ${buttonStyle}
            `}
          >
            <IoIosArrowUp size="24" color={colors.bgColorPrimary} />
          </button>
        </motion.div>
      </PersonDetailCardContainer>
    </>
  )
}

export default PersonDetailCard
