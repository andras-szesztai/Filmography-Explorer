import React from 'react'
import { css } from '@emotion/core'
import { useMeasure } from 'react-use'

import { IMAGE_ROOT } from '../../../constants/url'
import { colors } from '../../../styles/variables'

type Props = {
  alt?: string
  gridArea?: string
  url?: string
  borderRadius?: number
}

export default function Image({ url, alt, gridArea = 'photo', borderRadius = 2 }: Props) {
  const [divRef, { height }] = useMeasure<HTMLDivElement>()
  const sharedStyle = css`
    grid-area: ${gridArea};
    justify-self: end;
    height: 100%;
    border-radius: ${borderRadius}px;
  `
  return url ? (
    <img css={sharedStyle} src={`${IMAGE_ROOT}/${url}`} alt={alt} />
  ) : (
    <div
      ref={divRef}
      css={css`
        ${sharedStyle}
        width: ${height * 0.66}px;
        background: ${colors.bgColorSecondaryDark};
      `}
    />
  )
}
