import { css } from '@emotion/core'

import { height, space } from '../../../styles/variables'

export const contentGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  place-items: center;
  grid-template-rows: ${height.personCardExtra + space[4]}px ${height.personCardInfo}px ${height.personCardClosed - space[2]}px;
  grid-template-areas:
    '. . .'
    'bio bio photo'
    'name name icon';

  width: 100%;
  height: 100%;
`
