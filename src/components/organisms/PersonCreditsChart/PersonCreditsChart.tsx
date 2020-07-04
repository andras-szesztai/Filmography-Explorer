import React from 'react'
import { css } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'
import { usePrevious } from 'react-use'
import { extent } from 'd3-array'

import { space, colors } from '../../../styles/variables'
import { CombinedState } from '../../../types/state'
import { DateAxis } from '../../molecules'
import { updateChartSettings } from '../../../reducer/personCreditsChartReducer/actions'

const PersonCreditsChart = () => {
  const chartState = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const personDataSets = useSelector((state: CombinedState) => state.personReducer.dataSets)
  const dispatch = useDispatch()
  const prevPersonDetails = usePrevious(personDataSets.details)

  React.useEffect(() => {
    if (prevPersonDetails && !isEqual(personDataSets.details, prevPersonDetails)) {
      const movieSearchData = uniqBy([...personDataSets.credits.cast, ...personDataSets.credits.crew], 'id')
      const xScaleDomain = extent(movieSearchData, d => new Date(d.unified_date))
      const sizeScaleDomain = extent(movieSearchData, d => d.vote_count)
      const isBoth = !!(personDataSets.credits.cast.length && personDataSets.credits.crew.length)
      dispatch(
        updateChartSettings({
          nameId: personDataSets.details.id,
          movieSearchData,
          isBoth,
          scales: {
            xScaleDomain,
            sizeScaleDomain
          }
        })
      )
    }
  }, [personDataSets.details])

  console.log('PersonCreditsChart -> chartState', chartState)
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
          background: ${colors.bgColorPrimaryLight};

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
            <DateAxis dataSets={personDataSets.credits} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonCreditsChart
