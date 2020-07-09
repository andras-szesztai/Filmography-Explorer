import { css } from '@emotion/core'

// Styles
import { space, colors, height, fontSize, dentedStyle, zIndex } from '../../../styles/variables'

export const ContainerStyle = css`
  position: fixed;
  left: ${space[8]}px;
  bottom: 0px;
  width: calc(100vw - ${space[13]}px);
  height: ${height.personCardClosed}px;

  background-color: ${colors.bgColorSecondary};
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: ${space[5]}px;
  padding: 0 ${space[3]}px 0 ${space[5]}px;
  border-radius: ${space[1]}px ${space[1]}px 0 0;

  font-size: ${fontSize.md};
  letter-spacing: 1px;
  user-select: none;
  z-index: ${zIndex.mainSearchBar};
`

export const ScrollableContainerStyle = css`
position: absolute;
${dentedStyle}
border-radius: ${space[1]}px;
overflow-x: auto;
overflow-y: hidden;
height: 70%;

display: flex;
align-items: center;

padding-left: ${space[2]}px;
margin: 0;

::-webkit-scrollbar {
  height: ${space[1]}px;
}

::-webkit-scrollbar-track {
  background: ${colors.bgColorSecondaryDark};
}

::-webkit-scrollbar-thumb {
  background: ${colors.accentSecondary};
  border-radius: ${space[1]}px;
}
`
