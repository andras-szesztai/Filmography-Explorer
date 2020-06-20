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
        color: ${colors.primaryAccent};
        font-size: ${fontSize.lg};
        font-weight: ${fontWeight.lg};

        background: transparent;
        border: none;
      `}
    >
      {text}
    </button>
  )
}

export default NavItem
