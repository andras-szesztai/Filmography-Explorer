/* eslint-disable react/button-has-type */
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'
import 'what-input'
import useWhatInput from 'react-use-what-input'
import { useLocalStorage } from 'react-use'
import { IoIosArrowUp } from 'react-icons/io'

// Components
import { PersonDetailCardContainer, PersonDetaiCardShadow } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'
import { space, height, colors, buttonStyle, buttonNoFocus, buttonFocus } from '../../../styles/variables'
import { delay } from '../../../styles/animation'

const PersonDetailCard = () => {
  const personDetails = useSelector((state: CombinedState) => state.personReducer.dataSets.details)

  const [personCardIsOpen, setPersonCardIsOpen] = useLocalStorage('personCardIsOpen', true)
  const [isArrowHovered, setIsArrowHovered] = React.useState(false)

  const [currentInput] = useWhatInput()

  return (
    <>
      {personDetails && <PersonDetaiCardShadow />}
      <PersonDetailCardContainer isPopulated={!!personDetails} isOpen={personCardIsOpen}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: personDetails ? 1 : 0, transition: { delay: delay.md } }}
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
          <motion.button
            onClick={() => setPersonCardIsOpen(!personCardIsOpen)}
            onMouseOver={() => setIsArrowHovered(true)}
            onMouseOut={() => setIsArrowHovered(false)}
            onFocus={() => setIsArrowHovered(true)}
            onBlur={() => setIsArrowHovered(false)}
            css={css`
              display: flex;
              align-items: center;
              grid-area: icon;
              cursor: pointer;

              place-self: end start;

              ${buttonStyle}
              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
            `}
            initial={{ rotate: !personCardIsOpen ? 180 : 0 }}
            animate={{
              rotate: !personCardIsOpen ? 180 : 0,
              transition: {
                delay: delay.md
              }
            }}
          >
            <motion.div animate={{ scale: isArrowHovered ? 1.3 : 1 }}>
              <IoIosArrowUp size="24" color={colors.bgColorPrimary} />
            </motion.div>
          </motion.button>
        </motion.div>
      </PersonDetailCardContainer>
    </>
  )
}

export default PersonDetailCard
