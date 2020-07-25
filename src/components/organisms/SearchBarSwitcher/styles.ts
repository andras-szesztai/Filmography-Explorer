import { css } from '@emotion/core'
import { space, width, height, colors, handleSize } from '../../../styles/variables'

export const containerStyle = css`
  position: absolute;
  left: ${width.searchBar}px;
  height: ${height.searchBar}px;
  width: ${handleSize * 2}px;
  color: ${colors.bgColorSecondary};

  border-radius: 0 ${space[1]}px ${space[1]}px 0;
  border: 1px solid ${colors.textColorPrimary};
  border-left: none;

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
