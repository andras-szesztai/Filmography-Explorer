/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { select } from 'd3-selection'
import isEqual from 'lodash/isEqual'
import { usePrevious } from 'react-use'
import { useSelector } from 'react-redux'

// Utils
import { getSelectedLineYPos, setRadius } from '../functions/elementFunctions'

// Types
import { BubbleChartStoredValues } from '../../../../../types/chart'
import { CombinedState } from '../../../../../types/state'

// Styles
import { colors, circleAdjust } from '../../../../../styles/variables'

interface Params {
  height: number
  storedValues: { current: BubbleChartStoredValues }
  type: string
  isSizeDynamic: boolean
  addUpdateInteractions: () => void
}

export default function useHoveredUpdate({ storedValues, isSizeDynamic, type, addUpdateInteractions, height }: Params) {
  const hoveredMovie = useSelector((state: CombinedState) => state.personCreditsChartReducer.hoveredMovie)
  const prevHoveredMovie = usePrevious(hoveredMovie)
  React.useEffect(() => {
    if (!storedValues.current.isInit && prevHoveredMovie && hoveredMovie.id !== prevHoveredMovie.id) {
      const { chartArea, xScale, yScale, sizeScale } = storedValues.current
      chartArea.select('.hovered-circle').remove()
      chartArea.select('.hovered-line').remove()
      if (hoveredMovie.id) {
        chartArea.selectAll('.main-circle').each((d: any, i, n) => {
          if (isEqual(d, hoveredMovie.data)) {
            const selection = select(n[i])
            selection
              .append('circle')
              .attr('class', 'hovered-circle')
              .attr('cx', xScale(new Date(d.unified_date)))
              .attr('cy', yScale(d.vote_average))
              .attr('fill', 'transparent')
              .attr('stroke', colors.bgColorSecondary)
              .attr('r', () =>
                setRadius({
                  adjust: circleAdjust,
                  isSizeDynamic,
                  sizeScale
                })(d)
              )
              .lower()
            selection
              .append('line')
              .attr('class', 'hovered-line')
              .attr('x1', xScale(new Date(d.unified_date)))
              .attr('x2', xScale(new Date(d.unified_date)))
              .attr('y1', () =>
                getSelectedLineYPos({
                  data: d,
                  yScale,
                  sizeScale,
                  isSizeDynamic,
                  type
                })
              )
              .attr('y2', type === 'main' ? height : -height)
              .attr('stroke', colors.bgColorSecondary)
          }
        })
      }
      addUpdateInteractions()
    }
  })
}
