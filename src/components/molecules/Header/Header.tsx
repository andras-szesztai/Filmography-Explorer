import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { globalHistory } from '@reach/router'

// Components
import { NavItem } from '../../atoms'

// Styles
import { space, colors, fontSize, zIndex } from '../../../styles/variables'

const navItemNumbers: { [path: string]: number } = {
  '/': 0,
  '/my-watchlist': 1,
  '/about': 2
}

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState(-1)
  React.useEffect(() => {
    if (activeItem === -1) {
      const { location } = globalHistory
      setActiveItem(navItemNumbers[location.pathname] as number)
    }
  })
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
        <Link to="/">
          <NavItem text="Explore" activeItem={activeItem} itemNumber={0} setActiveItem={setActiveItem} />
        </Link>
        <Link to="/my-watchlist">
          <NavItem text="My Watchlist" activeItem={activeItem} itemNumber={1} withMargin setActiveItem={setActiveItem} />
        </Link>
        <Link to="/about">
          <NavItem text="About" activeItem={activeItem} itemNumber={2} withMargin setActiveItem={setActiveItem} />
        </Link>
      </div>
    </header>
  )
}

export default Header
