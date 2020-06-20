import React from 'react'
import { css } from '@emotion/core'

// Components
import { NavItem } from '../../atoms'

// Styles
import { space, colors, fontSize } from '../../../styles/variables'

const Header: React.FC = () => {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 ${space[7]}px;

        border-bottom: 1px solid ${colors.textColorPrimary};

        font-size: ${fontSize.md}px;
      `}
    >
      <NavItem text="Explore" isActive />
    </header>
  )
}

export default Header
