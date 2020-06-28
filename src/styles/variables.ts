import chroma from 'chroma-js'
import { css } from '@emotion/core'

export const fontSize = {
  xs: '1rem',
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
  xl: '3rem'
}

export const fontWeight = {
  xs: 200,
  sm: 300,
  md: 400,
  lg: 500,
  xl: 600
}

export const colors = {
  bgColorPrimary: '#232931',
  bgColorPrimaryShadow: '#2D204A',
  bgColorSecondary: '#FEFEFE',
  bgColorSecondaryDark: '#E0E0E0',
  textColorPrimary: '#FEFEFE',
  textColorSecondary: '#232931',
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
  searchResultHover: 10
}

export const width = {
  searchBar: 350,
  detailsCard: 400
}

export const height = {
  header: space[12],
  personCardOpen: 280,
  personCardClosed: 80,
  personCardExtra: 40,
  movieCard: 480,
  searchBar: space[10],
  searchResultHeight: space[13],
  searchResultHoverHeight: space[14]
}

export const dropShadow = {
  header: {
    primary: `0 4px 8px ${chroma(colors.bgColorPrimaryShadow).alpha(0.2)}`,
    secondary: `0 3px 6px ${chroma(colors.bgColorPrimaryShadow).alpha(0.35)}`,
    ternary: `0 2px 4px ${chroma(colors.bgColorPrimaryShadow).alpha(0.5)}`
  }
}

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
