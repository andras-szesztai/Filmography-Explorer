import chroma from 'chroma-js'
import { css } from '@emotion/core'

export const fontSize = {
  xs: '1rem',
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
  xl: '3rem',
  xxl: '3.5rem',
  charTitle: '10rem'
}

export const fontWeight = {
  xs: 200,
  sm: 300,
  md: 400,
  lg: 500,
  xl: 600
}

const colorDark = '#232931'
const colorLight = '#FEFEFE'

export const colors = {
  bgColorPrimary: colorDark,
  bgColorPrimaryLight: chroma(colorDark)
    .brighten(2)
    .hex(),
  bgColorSecondary: colorLight,
  textColorPrimary: colorLight,
  textColorSecondary: colorDark,
  bgColorSecondaryDark: '#E0E0E0',
  bgColorPrimaryShadow: '#2D204A',
  accentPrimary: '#FF4E47',
  accentSecondary: '#FEC33F'
}

export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 48,
  12: 56,
  13: 64,
  14: 72,
  15: 80,
  16: 88,
  17: 96
}

export const zIndex = {
  header: 60,
  headerShadow: 59,
  personDetailCard: 55,
  mainSearchBar: 50,
  chartTooltip: 40,
  searchResultHover: 10
}

export const width = {
  searchBar: 400,
  detailsCard: 400,
  movieDetailCardExtra: space[6],
  tooltipWidth: 320
}

export const height = {
  header: space[12],
  tooltip: 160,
  personCardOpen: 280,
  personCardInfo: 160,
  personCardClosed: space[13],
  personCardExtra: space[10],
  movieCard: 480,
  searchBar: space[10],
  searchResultHeight: space[13],
  searchResultHoverHeight: space[14]
}

export const tooltipOffset = space[3]

export const dropShadow = {
  header: {
    primary: `0 4px 8px ${chroma(colors.bgColorPrimaryShadow).alpha(0.2)}`,
    secondary: `0 3px 6px ${chroma(colors.bgColorPrimaryShadow).alpha(0.35)}`,
    ternary: `0 2px 4px ${chroma(colors.bgColorPrimaryShadow).alpha(0.5)}`
  }
}

export const boxShadow = {
  inset: {
    top: {
      primary: `inset 0 3px 6px ${chroma(colors.bgColorPrimaryShadow).alpha(0.2)}`,
      secondary: `inset 0 2px 4px ${chroma(colors.bgColorPrimaryShadow).alpha(0.35)}`,
      ternary: `inset 0 1px 2px ${chroma(colors.bgColorPrimaryShadow).alpha(0.5)}`
    },
    bottom: {
      primary: `inset 0 -3px 6px ${chroma(colors.bgColorSecondary).alpha(0.2)}`,
      secondary: `inset 0 -2px 4px ${chroma(colors.bgColorSecondary).alpha(0.35)}`,
      ternary: `inset 0 -1px 2px ${chroma(colors.bgColorSecondary).alpha(0.5)}`
    }
  }
}

export const dentedStyle = css`
  box-shadow: ${boxShadow.inset.top.primary}, ${boxShadow.inset.top.ternary}, ${boxShadow.inset.bottom.primary},
    ${boxShadow.inset.bottom.ternary};
`

export const buttonStyle = css`
  background: transparent;
  border: none;
  cursor: pointer;

  user-select: none;
  border-radius: ${space[1]}px;
`

export const buttonFocus = css`
  :focus {
    box-shadow: 0 0 0 1px ${colors.accentPrimary};
    outline: none;
  }
`

export const buttonNoFocus = css`
  :focus {
    outline: none;
  }
`

export const chartSideMargins = {
  left: space[8],
  right: space[8]
}

export const circleSizeRange = [space[1], space[7]]
export const circleRadius = space[2]
export const circleAdjust = space[1]
export const handleSize = space[10]
export const circleFillOpacity = 0.4

export const styledSelection = css`
  ::selection {
    background: ${colors.textColorSecondary};
    color: ${colors.textColorPrimary};
  }
`
