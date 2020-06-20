import React from 'react'
import { css } from '@emotion/core'
import { spaces, colors, fontSize } from '../../styles/variables'

interface Props {
  text: string
}

const NavItem: React.FC<Props> = ({ text }) => {
  return (
    <button
      type="button"
      css={css`
        font-size: ${fontSize.md}px;
      `}
    >
      {text}
    </button>
  )
}

export default NavItem
