import { css } from '@emotion/core'
import { space, width, height, colors } from '../../../styles/variables'

export const containerStyle = css`
  position: absolute;
  left: ${width.searchBar + space[4]}px;
  height: ${height.searchBar}px;
  width: ${space[17]}px;
  color: ${colors.bgColorSecondary};
  border: 1px solid ${colors.textColorPrimary};
  border-radius: ${space[1]}px;

  display: flex;
  align-items: center;

  overflow: hidden;
`

export const flexButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 50%;
`

export const backgroundStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${colors.bgColorSecondary};

  top: 0px;
  left: 0px;
  z-index: 1;
`
