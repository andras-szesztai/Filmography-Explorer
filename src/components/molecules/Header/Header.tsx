import React from 'react'
import { css } from '@emotion/core'

// Components
import { NavItem } from '../../atoms'

// Styles
import { spaces, colors, fontSize } from '../../../styles/variables'

const Header: React.FC = () => {
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
      <NavItem text="Explore" />
    </header>
  )
}

export default Header
