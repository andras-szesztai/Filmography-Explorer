/* eslint-disable @typescript-eslint/no-explicit-any */
import { BubbleChartStoredValues } from '../../../../../types/chart'
import { colors, fontSize } from '../../../../../styles/variables'

const gridData = [0, 2, 4, 6, 8, 10]

interface GridParams {
  storedValues: { current: BubbleChartStoredValues }
  left: number
  width: number
}

export function createGrid({ storedValues, left, width }: GridParams) {
  storedValues.current.gridArea
    .selectAll('.grid-line')
    .data(gridData, (d: any) => d)
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('x1', -left)
    .attr('x2', width)
    .attr('y1', d => storedValues.current.yScale(d))
    .attr('y2', d => storedValues.current.yScale(d))
    .attr('stroke', colors.bgColorPrimaryLight)
    .attr('stroke-width', 0.25)
}

export function createGridText({ storedValues, left, width }: GridParams) {
  storedValues.current.gridArea
    .selectAll('.grid-text')
    .data(gridData, (d: any) => d)
    .enter()
    .append('text')
    .attr('class', 'grid-text')
    .attr('x', width - left)
    .attr('y', d => storedValues.current.yScale(d))
    .attr('dy', d => (d < 5 ? -4 : 12))
    .attr('text-anchor', 'end')
    .attr('font-size', fontSize.sm)
    .attr('fill', colors.bgColorPrimaryLight)
    .text(d => d)
}
