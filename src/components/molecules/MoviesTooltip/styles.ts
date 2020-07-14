import { css } from '@emotion/core'

import { width, space, colors, fontSize, fontWeight, zIndex } from '../../../styles/variables'

export const containerStyle = css`
  position: absolute;
  width: ${width.tooltipWidth}px;

  pointer-events: none;

  padding: ${space[2]}px;

  border-radius: ${space[1]}px;
  background-color: ${colors.bgColorSecondary};

  display: grid;
  grid-template-columns: 105px 1fr;
  grid-template-areas: 'photo info';
  grid-column-gap: ${space[2]}px;
  z-index: ${zIndex.chartTooltip};
`

export const infoSectionStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;

  .section {
    margin-top: ${space[2]}px;
    font-size: ${fontSize.sm};
    font-weight: ${fontWeight.lg};
    color: ${colors.textColorSecondary};
    letter-spacing: 0.6px;

    span {
      letter-spacing: 0px;
      font-weight: ${fontWeight.sm};
    }
  }
`
