import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { space, colors, fontSize, fontWeight } from '../../../styles/variables'

interface Props {
  text: string
  isActive: boolean
}

const NavItem: React.FC<Props> = ({ text, isActive }) => {
  return (
    <motion.button
      type="button"
      animate={{ color: isActive ? colors.accentPrimary : colors.textColorPrimary }}
      css={css`
        font-size: ${fontSize.md}px;
        color: ${colors.textColorPrimary};
        font-size: ${fontSize.lg};
        font-weight: ${fontWeight.md};
        letter-spacing: ${space[1]}px;

        background: transparent;
        border: none;

        user-select: none;
        border-radius: ${space[1]}px;

        :focus {
          box-shadow: 0 0 0 1px ${colors.accentPrimary};
          outline: none;
        }
      `}
    >
      {text}
    </motion.button>
  )
}

export default NavItem
