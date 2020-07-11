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
  isBookmarkChart: boolean
}

export default function useHoveredUpdate({ storedValues, isSizeDynamic, type, addUpdateInteractions, height, isBookmarkChart }: Params) {
  const { personCreditsChartReducer, bookmarkedChartReducer } = useSelector((state: CombinedState) => state)
  const hovered = isBookmarkChart ? bookmarkedChartReducer.bookmarkedHoveredMovie : personCreditsChartReducer.hoveredMovie
  const prevHovered = usePrevious(hovered)
  React.useEffect(() => {
    if (!storedValues.current.isInit && prevHovered && hovered.id !== prevHovered.id) {
      const { chartArea, xScale, yScale, sizeScale } = storedValues.current
      chartArea.select('.hovered-circle').remove()
      chartArea.select('.hovered-line').remove()
      if (hovered.id) {
        chartArea.selectAll('.main-circle').each((d: any, i, n) => {
          if (isEqual(d, hovered.data)) {
            const selection = select(n[i])
            selection
              .append('circle')
              .attr('class', 'hovered-circle')
              .attr('cx', xScale(new Date(d.date)))
              .attr('cy', yScale(d.vote_average))
              .attr('fill', colors.bgColorPrimary)
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
              .attr('x1', xScale(new Date(d.date)))
              .attr('x2', xScale(new Date(d.date)))
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
