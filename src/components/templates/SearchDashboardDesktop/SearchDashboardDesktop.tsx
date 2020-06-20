import React from 'react'
import { css } from '@emotion/core'

const SearchDashboardDesktop: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {children}
    </div>
  )
}

export default SearchDashboardDesktop
