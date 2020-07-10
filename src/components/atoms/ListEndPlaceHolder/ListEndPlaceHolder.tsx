import React from 'react'
import { css } from '@emotion/core'

const ListEndPlaceHolder = () => {
  return (
    <div
      css={css`
        opacity: 0;
        padding: 2px;
        pointer-events: none;
      `}
    />
  )
}

export default ListEndPlaceHolder
