/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom } from 'd3-axis'

// Types
import { AxisStoredValues } from '../../../../../types/chart'

// Styles
import { colors, fontSize } from '../../../../../styles/variables'

interface Params {
  storedValues: AxisStoredValues
  width: number
}

export function createDateAxis({ storedValues, width }: Params) {
  const { xScale, chartArea } = storedValues
  chartArea
    .call(
      axisBottom(xScale)
        .ticks(width / 100)
        .tickSize(0)
    )
    .call(g => {
      g.select('.domain').remove()
      g.selectAll('text')
        .attr('dy', 0)
        .attr('fill', colors.textColorPrimary)
        .attr('font-size', fontSize.sm)
    })
}
