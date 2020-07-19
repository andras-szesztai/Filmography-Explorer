import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { IoIosCloseCircle } from 'react-icons/io'

// Styles
import { buttonStyle, buttonNoFocus, buttonFocus, colors } from '../../../styles/variables'

interface Props {
  currentInput: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

const CloseIconButton = ({ currentInput, setIsOpen, isOpen }: Props) => {
  return (
    <motion.button
      type="button"
      css={css`
        display: flex;
        ${buttonStyle}
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
      initial={{ y: -2, x: 6 }}
      whileHover={{ scale: 1.3 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <IoIosCloseCircle color={colors.bgColorSecondary} size={24} />
    </motion.button>
  )
}

export default CloseIconButton
