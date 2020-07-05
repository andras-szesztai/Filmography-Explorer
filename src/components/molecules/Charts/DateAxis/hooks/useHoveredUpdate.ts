/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import isEqual from 'lodash/isEqual'
import { usePrevious } from 'react-use'

// Types
import { AxisStoredValues } from '../../../../../types/chart'
import { HoveredMovie } from '../../../../../types/personCreditsChart'

// Styles
import { circleSizeRange, circleAdjust, tooltipOffset } from '../../../../../styles/variables'

interface Params {
  storedValues: {
    current: AxisStoredValues
  }
  height: number
  addUpdateInteractions: () => void
  hoveredMovie: HoveredMovie
}

export default function useHoveredUpdate({ storedValues, hoveredMovie, height, addUpdateInteractions }: Params) {
  const prevHoveredMovie = usePrevious(hoveredMovie)
  React.useEffect(() => {
    if (!storedValues.current.isInit && prevHoveredMovie && hoveredMovie.id !== prevHoveredMovie.id) {
      const { chartArea, mainData, xScale } = storedValues.current
      const setX = (d: any) => xScale(new Date(d.unified_date))
      const isToTooltipTheRight = hoveredMovie.xPosition === 0
      const posAdjust = circleSizeRange[0] + circleAdjust
      chartArea.selectAll('.hovered-circle').attr('opacity', 0)
      chartArea.selectAll('.hovered-line').attr('opacity', 0)
      if (hoveredMovie.id) {
        const isMain = !!mainData.find(d => isEqual(hoveredMovie.data, d))
        chartArea
          .selectAll('.hovered-circle')
          .datum(hoveredMovie.data)
          .attr('cx', setX)
          .attr('opacity', 1)
        chartArea
          .selectAll('.hovered-horizontal-line')
          .datum(hoveredMovie.data)
          .attr('x1', d => xScale(new Date(d.unified_date)) + (isToTooltipTheRight ? posAdjust : -posAdjust))
          .attr(
            'x2',
            d => xScale(new Date(d.unified_date)) + (isToTooltipTheRight ? posAdjust + tooltipOffset : -(posAdjust + tooltipOffset))
          )
          .attr('opacity', 1)
        if (isMain) {
          chartArea
            .select('.hovered-top-line')
            .datum(hoveredMovie.data)
            .attr('y2', -height / 2)
            .attr('x1', setX)
            .attr('x2', setX)
            .attr('opacity', 1)
        } else {
          chartArea
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
