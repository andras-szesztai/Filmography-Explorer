import { css } from '@emotion/core'

import { width, space, colors, fontSize, fontWeight } from '../../../styles/variables'

export const containerStyle = css`
  position: absolute;
  width: ${width.tooltipWidth}px;

  pointer-events: none;

  padding: ${space[2]}px;

  border-radius: ${space[1]}px;
  background-color: ${colors.bgColorSecondary};

  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-areas: 'photo info';
  grid-column-gap: ${space[4]}px;
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

    span {
      font-weight: ${fontWeight.sm};
    }
  }
`
