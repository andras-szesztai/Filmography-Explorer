import React from 'react'
import { css } from '@emotion/core'
import chroma from 'chroma-js'
import { useSelector } from 'react-redux'

import { space, colors } from '../../../styles/variables'
import { CombinedState } from '../../../types/state'

const PersonCreditsChart = () => {
  const personReducer = useSelector((state: CombinedState) => state.personReducer)
  console.log('PersonCreditsChart -> personReducer', personReducer)

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          background: ${chroma(colors.bgColorPrimary)
            .brighten(0.6)
            .hex()};

          height: 80%;
          width: calc(100% - ${space[13]}px);
          transform: translateY(${space[7]}px);
          border-radius: ${space[1]}px;

          display: grid;
          grid-template-rows: 50px auto;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          Filters
        </div>
        <div
          css={css`
            display: grid;
            grid-template-rows: ${personReducer.isBoth ? '1fr 25px 1fr' : '1fr 25px'};
          `}
        >
          <div>First</div>
          <div>Date</div>
          <div>Second</div>
        </div>
      </div>
    </div>
  )
}

export default PersonCreditsChart
