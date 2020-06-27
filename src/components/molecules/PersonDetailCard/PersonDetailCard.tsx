/* eslint-disable react/button-has-type */

import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import { IoIosArrowUp } from 'react-icons/io'
import { usePrevious } from 'react-use'
import { PersonDetailCardContainer } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'
import { space, height, colors, buttonStyle, dropShadow, width } from '../../../styles/variables'
import { useStateWithPrevious } from '../../../hooks'

const PersonDetailCard = () => {
  const personDetails = useSelector((state: CombinedState) => state.personReducer.dataSets.details)
  const prevPersonDetails = usePrevious(personDetails)

  const [isOpen, setIsOpen, prevIsOpen] = useStateWithPrevious(true)
  const [isHovered, setIsHovered] = React.useState(false)
  const [yPos, setYPos] = React.useState(-height.personCardOpen)
  React.useEffect(() => {
    if (personDetails && prevIsOpen) {
      if ((!prevPersonDetails && isOpen) || (isOpen && !prevIsOpen)) {
        setYPos(-height.personCardExtra)
      }
      if ((!prevPersonDetails && !isOpen) || (!isOpen && prevIsOpen)) {
        setYPos(-height.personCardOpen + height.personCardClosed)
      }
    }
  }, [isOpen, personDetails])

  return (
    <PersonDetailCardContainer yPos={yPos}>
      <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: personDetails ? 1 : 0, transition: { delay: 0.8 } }}
        css={css`
          position: relative;
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
        <motion.div
          css={css`
            position: absolute;
            filter: drop-shadow(${dropShadow.header.primary}) drop-shadow(${dropShadow.header.secondary})
              drop-shadow(${dropShadow.header.ternary});

            background: ${colors.bgColorSecondary};

            width: ${width.detailsCard + space[3]}px;
            height: ${height.personCardExtra}px;

            top: 0px;
            left: -${space[6]}px;
          `}
          initial={{ y: -yPos }}
          animate={{ y: 0 }}
        />

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
  )
}

export default PersonDetailCard
