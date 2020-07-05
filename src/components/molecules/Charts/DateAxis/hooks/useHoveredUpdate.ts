/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import { usePrevious } from 'react-use'

// Types
import { useSelector } from 'react-redux'
import { AxisStoredValues } from '../../../../../types/chart'
import { CombinedState } from '../../../../../types/state'

// Styles
import { circleSizeRange, circleAdjust, tooltipOffset } from '../../../../../styles/variables'

interface Params {
  storedValues: {
    current: AxisStoredValues
  }
  height: number
  addUpdateInteractions: () => void
}

export default function useHoveredUpdate({ storedValues, height, addUpdateInteractions }: Params) {
  const hoveredMovie = useSelector((state: CombinedState) => state.personCreditsChartReducer.hoveredMovie)
  const prevHoveredMovie = usePrevious(hoveredMovie)

  useEffect(() => {
    if (!storedValues.current.isInit && prevHoveredMovie && hoveredMovie.id !== prevHoveredMovie.id) {
      const { hoverElementArea, mainData, xScale } = storedValues.current
      const setX = (d: any) => xScale(new Date(d.unified_date))
      const isToTooltipTheRight = hoveredMovie.xPosition === 0
      const posAdjust = circleSizeRange[0] + circleAdjust
      hoverElementArea.selectAll('.hovered-circle').attr('opacity', 0)
      hoverElementArea.selectAll('.hovered-line').attr('opacity', 0)
      if (hoveredMovie.id) {
        const isMain = !!mainData.find(d => isEqual(hoveredMovie.data, d))
        hoverElementArea
          .selectAll('.hovered-circle')
          .datum(hoveredMovie.data)
          .attr('cx', setX)
          .attr('opacity', 1)
        hoverElementArea
          .selectAll('.hovered-horizontal-line')
          .datum(hoveredMovie.data)
          .attr('x1', d => xScale(new Date(d.unified_date)) + (isToTooltipTheRight ? posAdjust : -posAdjust))
          .attr(
            'x2',
            d => xScale(new Date(d.unified_date)) + (isToTooltipTheRight ? posAdjust + tooltipOffset : -(posAdjust + tooltipOffset))
          )
          .attr('opacity', 1)
        if (isMain) {
          hoverElementArea
            .select('.hovered-top-line')
            .datum(hoveredMovie.data)
            .attr('y2', -height / 2)
            .attr('x1', setX)
            .attr('x2', setX)
            .attr('opacity', 1)
        } else {
          hoverElementArea
            .select('.hovered-bottom-line')
            .datum(hoveredMovie.data)
            .attr('y2', height / 2)
            .attr('x1', setX)
            .attr('x2', setX)
            .attr('opacity', 1)
        }
      }
      addUpdateInteractions()
    }
  })
}
