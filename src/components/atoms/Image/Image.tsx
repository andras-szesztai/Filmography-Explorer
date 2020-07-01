import React from 'react'
import { css } from '@emotion/core'

import { IMAGE_ROOT } from '../../../constants/url'
import { colors, space } from '../../../styles/variables'

type Props = {
  height: number
  alt: string
  gridArea?: string
  url?: string
}

export default function Image({ url, height, alt, gridArea = 'photo' }: Props) {
  return url ? (
    <img
      css={css`
        height: 100%;
        grid-area: ${gridArea};
        border-radius: ${space[1]}px;
      `}
      src={`${IMAGE_ROOT}/${url}`}
      alt={alt}
    />
  ) : (
    <div
      css={css`
        grid-area: ${gridArea};
        background: ${colors.bgColorSecondaryDark};
        width: ${height * 0.66}px;
        height: ${height}px;
        border-radius: ${space[1]}px;
      `}
    />
  )
}
