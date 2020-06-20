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
        position: fixed;
        top: 0px;
        left: 0px;

        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 ${space[11]}px 0 ${space[11]}px;

        border-bottom: 1px solid ${colors.textColorPrimary};

        font-size: ${fontSize.md}px;
      `}
    >
      <NavItem text="Explore" />
    </header>
  )
}

export default Header
