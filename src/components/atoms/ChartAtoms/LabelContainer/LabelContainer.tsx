import React from 'react'
import { css } from '@emotion/core'

// Styles
import { fontSize, colors, space } from '../../../../styles/variables'

interface Props {
  label: string
}

const LabelContainer = ({ label }: Props) => {
  return (
    <span
      css={css`
        position: absolute;
        bottom: ${space[2]}px;
        right: ${space[3]}px;
        color: ${colors.bgColorPrimaryLight};
        font-size: ${fontSize.sm};
        line-height: 1.25s;
        letter-spacing: 1px;
        user-select: none;
        pointer-events: none;
      `}
    >
      {label}
    </span>
  )
}

export default LabelContainer
