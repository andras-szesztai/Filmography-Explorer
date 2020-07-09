import { css } from '@emotion/core'

// Styles
import { space, height, width, handleSize, colors } from '../../../styles/variables'

const MovieDetailCardContainer = css`
  position: fixed;
  background-color: ${colors.bgColorSecondary};
  top: calc(50% - ${height.movieCard / 2}px);
  width: ${width.detailsCard + width.moveDetailCardExtra}px;
  height: ${height.movieCard}px;
  z-index: 15;
`
const HandleStyle = css`
  content: '';
  position: absolute;
  z-index: 4;
  width: ${handleSize}px;
  background-color: ${colors.bgColorSecondary};
  border-radius: ${space[1]}px 0 0 ${space[1]}px;
`

export const MovieDetailCardContainerRight = css`
  ${MovieDetailCardContainer}
  right: -${width.moveDetailCardExtra}px;
  :after {
    ${HandleStyle}
    bottom: 0px;
    height: ${handleSize}px;
    left: -${handleSize - 4}px;
    border-radius: ${space[1]}px 0 0 ${space[1]}px;
  }

  :before {
    ${HandleStyle}
    top: 0px;
    height: ${handleSize}px;
    left: -${handleSize - 4}px;
    border-radius: ${space[1]}px 0 0 ${space[1]}px;
  }
`

export const MovieDetailCardContainerLeft = css`
  ${MovieDetailCardContainer}
  left: -${width.moveDetailCardExtra}px;
  :after {
    ${HandleStyle}
    bottom: 0px;
    right: ${-handleSize + 4}px;
    height: ${handleSize}px;
    border-radius: 0 ${space[1]}px ${space[1]}px 0;
  }

  :before {
    ${HandleStyle}
    top: 0px;
    right: ${-handleSize + 4}px;
    height: ${handleSize}px;
    border-radius: 0 ${space[1]}px ${space[1]}px 0;
  }
`
