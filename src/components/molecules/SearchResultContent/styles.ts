import { css } from '@emotion/core'

// Styles
import { space, colors, fontSize, fontWeight, height, dropShadow } from '../../../styles/variables'

export const containerStyle = css`
  align-self: start;
  width: calc(100% - ${space[2]}px);
  height: ${height.searchResultHeight}px;
  border-radius: ${space[1]}px;
  background-color: ${colors.bgColorSecondary};
  filter: drop-shadow(${dropShadow.header.ternary});
  margin: ${space[1]}px;
  padding: ${space[1] + 2}px ${space[2]}px;
  color: ${colors.textColorSecondary};
`

export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: ${space[9]}px 1fr;
  grid-template-rows: repeat(2, 50%);
  grid-template-areas:
    'photo name'
    'photo job';
  grid-column-gap: ${space[3]}px;
`

export const flexContainerStyle = css`
  display: flex;
  align-items: center;
`

export const nameContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.lg};

  grid-area: name;
  margin-top: ${space[1]}px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const jobContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.sm};
  grid-area: job;
  margin-bottom: ${space[1]}px;
`

export const variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12
    }
  },
  exit: {
    y: '-100%',
    opacity: -1,
    transition: {
      type: 'spring',
      damping: 12
    }
  }
}
