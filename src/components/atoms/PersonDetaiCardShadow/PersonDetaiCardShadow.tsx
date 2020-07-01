import React from 'react'
import { css } from '@emotion/core'
import { colors, space, zIndex, height, width, dropShadow } from '../../../styles/variables'

const PersonDetaiCardShadow = () => {
  return (
    <div
      css={css`
        position: fixed;
        overflow-x: hidden;

        width: ${width.detailsCard}px;
        height: ${height.personCardExtra}px;

        z-index: ${zIndex.headerShadow};

        top: ${height.header - height.personCardExtra}px;
        right: ${space[8]}px;
        transform: translateY(100%);
      `}
    >
      <div
        css={css`
          position: absolute;
          background: ${colors.bgColorSecondary};

          width: calc(100% + ${space[8]}px);
          height: 100%;
          filter: drop-shadow(${dropShadow.header.primary}) drop-shadow(${dropShadow.header.secondary})
            drop-shadow(${dropShadow.header.ternary});

          transform: translate(-${space[4]}px, -100%);
        `}
      />
    </div>
  )
}

export default PersonDetaiCardShadow
