import React from 'react'
import { css } from '@emotion/core'

import { IMAGE_ROOT } from '../../../constants/url'
import { colors } from '../../../styles/variables'

type Props = {
  alt: string
  gridArea?: string
  url?: string
  borderRadius?: number
}

export default function Image({ url, alt, gridArea = 'photo', borderRadius = 2 }: Props) {
  return url ? (
    <img
      css={css`
        height: 100%;
        grid-area: ${gridArea};
        border-radius: ${borderRadius}px;
      `}
      src={`${IMAGE_ROOT}/${url}`}
      alt={alt}
    />
  ) : (
    <div
      css={css`
        grid-area: ${gridArea};
        place-self: stretch;
        background: ${colors.bgColorSecondaryDark};
        border-radius: ${borderRadius}px;
      `}
    />
  )
}
