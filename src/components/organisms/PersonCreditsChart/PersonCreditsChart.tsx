import React from 'react'
import { css } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'
import { usePrevious } from 'react-use'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'

import { space, colors } from '../../../styles/variables'
import { CombinedState } from '../../../types/state'
import { DateAxis } from '../../molecules'
import { updateChartSettings } from '../../../reducer/personCreditsChartReducer/actions'
import { useUpdateChartSettings } from './hooks'

const PersonCreditsChart = () => {
  const chartState = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const personDataSets = useSelector((state: CombinedState) => state.personReducer.dataSets)

  useUpdateChartSettings(personDataSets)
  const [isFirstEntered, setIsFirstEntered] = React.useState(true)

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
          background: ${colors.bgColorPrimary};

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
        {chartState.nameId && (
          <div
            css={css`
              display: grid;
              grid-template-rows: ${chartState.isBoth ? '1fr 35px 1fr' : '1fr 35px'};
            `}
          >
            <div />
            <DateAxis
              xScaleDomain={chartState.scales.xScaleDomain}
              dataSets={personDataSets.credits}
              isBoth={chartState.isBoth}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonCreditsChart
