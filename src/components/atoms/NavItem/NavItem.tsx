import React from 'react'
import { css } from '@emotion/core'

// Styles
import { spaces, colors, fontSize, fontWeight } from '../../../styles/variables'

interface Props {
  text: string
}

const NavItem: React.FC<Props> = ({ text }) => {
  return (
    <button
      type="button"
      css={css`
        font-size: ${fontSize.md}px;
        color: ${colors.textColorPrimary};
        font-size: ${fontSize.lg};
        font-weight: ${fontWeight.md};
        letter-spacing: ${spaces[1]}px;

        background: transparent;
        border: none;

        user-select: none;
        border-radius: ${spaces[1]}px;

        :focus {
          box-shadow: 0 0 0 1px ${colors.accentPrimary};
          outline: none;
        }
      `}
    >
      {text}
    </button>
  )
}

export default NavItem
