import { css } from '@emotion/core'

// Styles
import {
  space,
  height,
  width,
  handleSize,
  colors,
  fontSize,
  fontWeight,
  styledSelection,
  dentedStyle,
  dropShadow
} from '../../../styles/variables'

const movieDetailCardContainer = css`
  position: fixed;
  background-color: ${colors.bgColorSecondary};
  top: calc(50% - ${height.movieCard / 2 - space[8]}px);
  width: ${width.detailsCard + width.movieDetailCardExtra}px;
  height: ${height.movieCard}px;

  filter: drop-shadow(${dropShadow.header.ternary});
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

export const movieDetailCardContainerRight = css`
  ${movieDetailCardContainer}
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

export const movieDetailCardContainerLeft = css`
  ${movieDetailCardContainer}
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

export const mainGridStyle = css`
  padding: ${space[3]}px;

  display: grid;
  grid-area: content;
  grid-template-columns: 1fr 120px;
  grid-column-gap: ${space[3]}px;
  grid-template-rows: 185px repeat(3, 70px) 1fr;
  grid-row-gap: ${space[2]}px;
  grid-template-areas:
    'info photo'
    'genre genre'
    'crew crew'
    'cast cast'
    'link link';
`

export const infoGrid = css`
  display: grid;
  grid-area: info;
  grid-template-rows: repeat(2, max-content) 1fr;
  align-items: start;
`

export const movieTitle = css`
  color: ${colors.textColorSecondary};
  line-height: 1.3;
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.lg};
  cursor: pointer;
  letter-spacing: 0.8px;

  ${styledSelection}
`

export const subtitle = css`
  white-space: nowrap;
  color: ${colors.textColorSecondary};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.sm};
  margin-top: ${space[1]}px;
  margin-bottom: ${space[2]}px;
  cursor: default;
  ${styledSelection}
`

export const rowStyle = css`
  display: grid;
  grid-template-rows: 32px 1fr;
`

export const rowTitleStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${colors.textColorSecondary};
  letter-spacing: 0.8px;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.lg};
`

export const horizontalScrollableStyle = css`
  ${dentedStyle}
  border-radius: ${space[1]}px;
  overflow-x: auto;
  overflow-y: hidden;

  display: flex;
  align-items: center;

  padding-left: ${space[1]}px;

  ::-webkit-scrollbar {
    height: ${space[1]}px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.bgColorSecondaryDark};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.bgColorPrimary};
    border-radius: ${space[1]}px;
  }
`

export const linkContainerStyle = css`
  display: flex;

  grid-area: link;
  align-items: flex-end;

  font-size: ${fontSize.sm};
  color: ${colors.textColorSecondary};

  a {
    text-decoration: none;
    color: inherit;

    span {
      font-weight: ${fontWeight.lg};
    }
  }
`
