/* eslint-disable @typescript-eslint/no-explicit-any */
// Types
import { Delaunay } from 'd3-delaunay'
import { BubbleChartStoredValues, Margin } from '../../../../../types/chart'
import { FormattedPersonCreditDataObject } from '../../../../../types/person'

// Styles
import { colors, fontSize, circlRadius, circleFillOpacity } from '../../../../../styles/variables'

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
    .attr('dy', d => (d < 5 ? -5 : 13))
    .attr('text-anchor', 'end')
    .attr('font-size', fontSize.sm)
    .attr('fill', colors.bgColorPrimaryLight)
    .text(d => d)
}

interface CircleParams {
  storedValues: { current: BubbleChartStoredValues }
  data: FormattedPersonCreditDataObject[]
  isSizeDynamic: boolean
}

export function createCircles({ storedValues, data, isSizeDynamic }: CircleParams) {
  const { xScale, sizeScale, yScale, chartArea } = storedValues.current

  chartArea
    .selectAll('circle')
    .data(data, (d: any) => d.id)
    .join(enter =>
      enter
        .append('circle')
        .attr('cx', d => xScale(new Date(d.unified_date)))
        .attr('cy', d => yScale(d.vote_average))
        .attr('r', d => (isSizeDynamic ? sizeScale(d.vote_count) : circlRadius))
        .attr('fill', colors.bgColorPrimaryLight)
        .attr('fill-opacity', circleFillOpacity)
        .attr('stroke', colors.bgColorSecondary)
        // TODO: setup when favoriting is back
        // .attr('fill',  => (favoriteMovies.includes(id) ? COLORS.favorite : COLORS.secondary))
        // .attr('stroke', ({ id }) => (favoriteMovies.includes(id) ? chroma(COLORS.favorite).darken() : chroma(COLORS.secondary).darken()))
        .call(e => e)
    )
}

interface VoronoiParams {
  storedValues: { current: BubbleChartStoredValues }
  data: FormattedPersonCreditDataObject[]
  margin: Margin
  width: number
  height: number
  activeMovieID: number
  // addUpdateInteractions: () => void
}

export function createUpdateVoronoi({ storedValues, margin, data, width, height, activeMovieID }: VoronoiParams) {
  const { yScale, xScale, voronoiArea } = storedValues.current
  const setXPos = (d: any) => xScale(new Date(d.unified_date)) + margin.left
  const setYPos = (d: any) => yScale(d.vote_average) + margin.top
  const delaunay = Delaunay.from(data, setXPos, setYPos).voronoi([0, 0, width, height])

  voronoiArea
    .selectAll('.voronoi-path')
    .data(data, (d: any) => d.id)
    .join(
      enter =>
        enter
          .append('path')
          .attr('class', 'voronoi-path')
          .attr('fill', 'transparent')
          .attr('cursor', d => (activeMovieID === d.id ? 'default' : 'pointer'))
          .attr('d', (_, i) => delaunay.renderCell(i))
          .call(e => e),
      update => update.call(u => u.transition().attr('d', (_, i) => delaunay.renderCell(i)))
    )
  // addUpdateInteractions()
}
