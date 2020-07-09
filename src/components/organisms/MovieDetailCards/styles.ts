import { css } from '@emotion/core'

// Styles
import { space, height, width, handleSize, colors } from '../../../styles/variables'

const MovieDetailCardContainer = css`
  position: fixed;
  background-color: ${colors.bgColorSecondary};
  top: calc(50% - ${height.movieCard / 2}px);
  width: ${width.detailsCard + width.movieDetailCardExtra}px;
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
  right: -${width.movieDetailCardExtra + width.detailsCard + handleSize}px;
  :after {
    ${HandleStyle}
    bottom: 0px;
    height: ${handleSize}px;
    left: -${handleSize}px;
    border-radius: ${space[1]}px 0 0 ${space[1]}px;
  }

  :before {
    ${HandleStyle}
    top: 0px;
    height: ${handleSize}px;
    left: -${handleSize}px;
    border-radius: ${space[1]}px 0 0 ${space[1]}px;
  }
`

export const MovieDetailCardContainerLeft = css`
  ${MovieDetailCardContainer}
  left: -${width.movieDetailCardExtra + width.detailsCard + handleSize}px;
  :after {
    ${HandleStyle}
    bottom: 0px;
    right: ${-handleSize}px;
    height: ${handleSize}px;
    border-radius: 0 ${space[1]}px ${space[1]}px 0;
  }

  :before {
    ${HandleStyle}
    top: 0px;
    right: ${-handleSize}px;
    height: ${handleSize}px;
    border-radius: 0 ${space[1]}px ${space[1]}px 0;
  }
`

export const MainGridStyle = css`
  padding: ${space[3]}px;

  display: grid;
  grid-area: content;
  grid-template-columns: 1fr 120px;
  grid-column-gap: ${space[3]}px;
  grid-template-rows: 185px repeat(3, 70px) 1fr;
  grid-row-gap: ${space[2]}px;
  grid-template-areas:
    'info poster'
    'genre genre'
    'crew crew'
    'cast cast'
    'link link';
`
