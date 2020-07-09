import { css } from '@emotion/core'

// Styles
import { space, height, width, handleSize, colors, fontSize, fontWeight, styledSelection } from '../../../styles/variables'

const MovieDetailCardContainer = css`
  position: fixed;
  background-color: ${colors.bgColorSecondary};
  top: calc(50% - ${height.movieCard / 2 - space[8]}px);
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
    'info photo'
    'genre genre'
    'crew crew'
    'cast cast'
    'link link';
`

export const InfoGrid = css`
  display: grid;
  grid-area: info;
  grid-template-rows: repeat(2, max-content) 1fr;
  align-items: start;
`

export const MovieTitle = css`
  color: ${colors.textColorSecondary};
  line-height: 1.3;
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.lg};
  cursor: pointer;

  ${styledSelection}
`

export const Subtitle = css`
  white-space: nowrap;
  color: ${colors.textColorSecondary};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.sm};
  margin-top: ${space[1]}px;
  margin-bottom: ${space[2]}px;
  cursor: default;
  ${styledSelection}
`

export const Row = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  font-size: ${themifyFontSize(1)};
`

export const RowTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${COLORS.textColor};
  font-weight: 500;
`
