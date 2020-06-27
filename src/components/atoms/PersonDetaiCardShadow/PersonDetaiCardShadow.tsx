import React from 'react'
import { css } from '@emotion/core'
import { colors, space, zIndex, height, width, dropShadow } from '../../../styles/variables'

const PersonDetaiCardShadow = () => {
  return (
    <>
      <div
        css={css`
          position: fixed;

          background: ${colors.bgColorPrimary};

          width: ${space[8]}px;
          height: ${space[8]}px;

          z-index: ${zIndex.headerShadow + 1};

          top: ${height.header}px;
          right: ${space[8] + width.detailsCard}px;
        `}
      />
      <div
        css={css`
          position: fixed;

          background: ${colors.bgColorPrimary};

          width: ${space[8]}px;
          height: ${space[8]}px;

          z-index: ${zIndex.headerShadow + 1};

          top: ${height.header}px;
          right: 0px;
        `}
      />
      <div
        css={css`
          position: fixed;
          filter: drop-shadow(${dropShadow.header.primary}) drop-shadow(${dropShadow.header.secondary})
            drop-shadow(${dropShadow.header.ternary});

          background: ${colors.bgColorSecondary};

          width: ${width.detailsCard + space[8]}px;
          height: ${height.personCardExtra}px;

          z-index: ${zIndex.headerShadow};

          top: ${height.header - height.personCardExtra}px;
          right: ${space[4]}px;
        `}
      />
    </>
  )
}

export default PersonDetaiCardShadow
