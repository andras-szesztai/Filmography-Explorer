import React from 'react'
import { css } from '@emotion/core'

// Components
import { NavItem } from '../../atoms'

// Styles
import { space, colors, fontSize, zIndex } from '../../../styles/variables'

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState(0)
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        position: relative;

        padding: 0 ${space[8]}px;
        background: ${colors.bgColorPrimary};

        border-bottom: 1px solid ${colors.textColorPrimary};

        font-size: ${fontSize.md}px;
        z-index: ${zIndex.header};
      `}
    >
      <div>
        <NavItem text="Explore" isActive={activeItem === 0} />
        <NavItem text="My Bookmarks" isActive={activeItem === 1} withMargin />
        <NavItem text="About" isActive={activeItem === 2} withMargin />
      </div>
    </header>
  )
}

export default Header
