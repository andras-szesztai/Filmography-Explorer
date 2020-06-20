import React from 'react'
import { css } from '@emotion/core'
import { spaces, colors, fontSize } from '../../styles/variables'

const Header: React.FC = ({ children }) => {
  return (
    <header
      css={css`
        height: ${spaces[11]}px;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 ${spaces[11]}px 0 ${spaces[11]}px;

        border-bottom: 1px solid ${colors.textColor};

        font-size: ${fontSize.md}px;
      `}
    >
      {children}
    </header>
  )
}

export default Header
