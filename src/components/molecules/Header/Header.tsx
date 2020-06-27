import React from 'react'
import { css } from '@emotion/core'

// Components
import { NavItem } from '../../atoms'

// Styles
import { space, colors, fontSize, zIndex, dropShadow } from '../../../styles/variables'

const Header: React.FC = () => {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 ${space[7]}px;
        background: ${colors.bgColorPrimary};

        border-bottom: 1px solid ${colors.textColorPrimary};

        filter: drop-shadow(${dropShadow.header.primary}) drop-shadow(${dropShadow.header.secondary})
          drop-shadow(${dropShadow.header.ternary});

        font-size: ${fontSize.md}px;
        z-index: ${zIndex.header};
      `}
    >
      <NavItem text="Explore" isActive />
    </header>
  )
}

export default Header
