import React from 'react'
import { css } from '@emotion/core'

// Styles
import { fontSize, colors } from '../../../../styles/variables'

interface Props {
  label: string
  top?: number
  left?: number
  right?: number
  bottom?: number
}

const LabelContainer = ({ label, top, left, right, bottom }: Props) => {
  return (
    <div
      css={css`
        position: absolute;
        top: ${top}px;
        bottom: ${bottom}px;
        left: ${left}px;
        right: ${right}px;
        color: ${colors.textColorPrimary};
        font-size: ${fontSize.sm};
        line-height: 1.2;
        width: 50px;
        letter-spacing: 1px;
      `}
    >
      {label}
    </div>
  )
}

LabelContainer.defaultProps = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

export default LabelContainer
