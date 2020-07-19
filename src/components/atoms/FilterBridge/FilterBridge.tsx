import React from 'react'

import { css } from '@emotion/core'
import { colors, space } from '../../../styles/variables'

const FilterBridge = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <span
      css={css`
        position: absolute;
        background: ${colors.bgColorPrimaryLight};
        width: ${space[8]}px;
        height: ${space[2]}px;
        bottom: -${space[2]}px;
        left: calc(50% - ${space[4]}px);
        z-index: 1;
      `}
    />
  ) : null
}

export default FilterBridge
