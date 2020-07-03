import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { IoIosArrowUp } from 'react-icons/io'

// Styles
import { buttonStyle, buttonNoFocus, buttonFocus, colors } from '../../../styles/variables'
import { delay } from '../../../styles/animation'

interface Props {
  setPersonCardIsOpen: (bool: boolean) => void
  personCardIsOpen?: boolean
  currentInput: string
}

const PersonContainerArrow = ({ setPersonCardIsOpen, personCardIsOpen, currentInput }: Props) => {
  const [isArrowHovered, setIsArrowHovered] = React.useState(false)
  return (
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

        place-self: end end;
        padding: 0;

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
  )
}

PersonContainerArrow.defaultProps = {
  personCardIsOpen: false
}

export default PersonContainerArrow
