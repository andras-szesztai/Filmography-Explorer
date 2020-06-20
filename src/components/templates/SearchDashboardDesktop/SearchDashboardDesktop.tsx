import React from 'react'
import { css } from '@emotion/core'

// Styles
import { space } from '../../../styles/variables'

const SearchDashboardDesktop: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        position: relative;
        padding: 0 ${space[7]}px;

        overflow: hidden;
      `}
    >
      {children}
    </div>
  )
}

export default SearchDashboardDesktop
