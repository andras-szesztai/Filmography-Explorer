/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom } from 'd3-axis'
import { Delaunay } from 'd3-delaunay'

// Types
import { AxisStoredValues } from '../../../../../types/chart'

// Styles
import { colors, fontSize } from '../../../../../styles/variables'
import { FormattedPersonCreditDataObject } from '../../../../../types/person'

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
        .attr('letter-spacing', 1)
    })
}

interface VoronoiParams {
  addUpdateInteractions: () => void
  storedValues: {
    current: AxisStoredValues
  }
  left: number
  height: number
  width: number
}

export function createUpdateVoronoi({ addUpdateInteractions, storedValues, left, height, width }: VoronoiParams) {
  const { xScale, voronoiArea, uniqData } = storedValues.current
  const setXPos = (d: FormattedPersonCreditDataObject) => xScale(new Date(d.unified_date)) + left
  const delaunay = Delaunay.from(uniqData, setXPos, () => height / 2).voronoi([0, 0, width, height])
  voronoiArea
    .selectAll('.voronoi-path')
    .data(uniqData, (d: any) => d.id)
    .join(
      enter =>
        enter
          .append('path')
          .attr('class', 'voronoi-path')
          .attr('fill', 'transparent')
          // .attr('cursor', d => (props.activeMovie.id === d.id ? 'default' : 'pointer'))
          .attr('d', (_, i) => delaunay.renderCell(i))
          .call(e => e),
      update => update.call(u => u.transition().attr('d', (_, i) => delaunay.renderCell(i)))
    )
  addUpdateInteractions()
}
