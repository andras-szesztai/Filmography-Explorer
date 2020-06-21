import React from 'react'
import { css } from '@emotion/core'

import { IMAGE_ROOT } from '../../../constants/url'
import { colors, space } from '../../../styles/variables'

type Props = {
  url: string
  height: number
  alt: string
}

export default function Image({ url, height, alt }: Props) {
  return url ? (
    <img
      css={css`
        height: 100%;
        grid-area: photo;
        border-radius: 2px;
      `}
      src={`${IMAGE_ROOT}/${url}`}
      alt={alt}
    />
  ) : (
    <div
      css={css`
        grid-area: photo;
        background: ${colors.bgColorSecondaryDark};
        width: height * 0.66;
        height: ${height};
        border-radius: ${space[1]}px;
      `}
    />
  )
}
