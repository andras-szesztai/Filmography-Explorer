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
  isBookmarkChart: boolean
}

export default function useHoveredUpdate({ storedValues, height, addUpdateInteractions, isBookmarkChart }: Params) {
  const { personCreditsChartReducer, bookmarkedChartReducer } = useSelector((state: CombinedState) => state)
  const hovered = isBookmarkChart ? bookmarkedChartReducer.bookmarkedHoveredMovie : personCreditsChartReducer.hoveredMovie
  const prevHovered = usePrevious(hovered)

  useEffect(() => {
    if (!storedValues.current.isInit && prevHovered && hovered.id !== prevHovered.id) {
      const { hoverElementArea, mainData, xScale } = storedValues.current
      const setX = (d: any) => xScale(new Date(d.date))
      const isToTooltipTheRight = hovered.xPosition === 0
      const posAdjust = circleSizeRange[0] + circleAdjust
      hoverElementArea.selectAll('.hovered-circle').attr('opacity', 0)
      hoverElementArea.selectAll('.hovered-line').attr('opacity', 0)
      if (hovered.id) {
        const isMain = mainData && !!mainData.find(d => isEqual(hovered.data, d))
        hoverElementArea
          .selectAll('.hovered-circle')
          .datum(hovered.data)
          .attr('cx', setX)
          .attr('opacity', 1)
        hoverElementArea
          .selectAll('.hovered-horizontal-line')
          .datum(hovered.data)
          .attr('x1', d => xScale(new Date(d.date)) + (isToTooltipTheRight ? posAdjust : -posAdjust))
          .attr('x2', d => xScale(new Date(d.date)) + (isToTooltipTheRight ? posAdjust + tooltipOffset : -(posAdjust + tooltipOffset)))
          .attr('opacity', 1)
        if (isMain) {
          hoverElementArea
            .select('.hovered-top-line')
            .datum(hovered.data)
            .attr('y2', -height / 2)
            .attr('x1', setX)
            .attr('x2', setX)
            .attr('opacity', 1)
        } else {
          hoverElementArea
            .select('.hovered-bottom-line')
            .datum(hovered.data)
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
