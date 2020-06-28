import React from 'react'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import { motion } from 'framer-motion'

// Styles
import { space, colors, fontSize, fontWeight, buttonStyle, buttonNoFocus, buttonFocus } from '../../../styles/variables'

interface Props {
  text: string
  isActive: boolean
}

const NavItem: React.FC<Props> = ({ text, isActive }) => {
  const [currentInput] = useWhatInput()
  return (
    <motion.button
      type="button"
      animate={{ color: isActive ? colors.accentPrimary : colors.textColorPrimary }}
      css={css`
        font-size: ${fontSize.md}px;
        color: ${colors.textColorPrimary};
        font-size: ${fontSize.lg};
        font-weight: ${fontWeight.lg};
        letter-spacing: ${space[1]}px;

        ${buttonStyle}
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      {text}
    </motion.button>
  )
}

export default NavItem
