import React from 'react'
import { css } from '@emotion/core'
import chroma from 'chroma-js'
import { useSelector } from 'react-redux'

import { space, colors } from '../../../styles/variables'
import { CombinedState } from '../../../types/state'
import { DateAxis } from '../../molecules'

const PersonCreditsChart = () => {
  const personReducer = useSelector((state: CombinedState) => state.personReducer)
  // console.log('PersonCreditsChart -> personReducer', personReducer)

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
            .brighten(0.5)
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
        />
        {/* {personReducer.isFetched && (
          <div
            css={css`
              display: grid;
              grid-template-rows: ${personReducer.isBoth ? '1fr 50px 1fr' : '1fr 30px'};
            `}
          >
            <>
              <div />
              <DateAxis dataSets={personReducer.dataSets.credits} />
            </>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default PersonCreditsChart
