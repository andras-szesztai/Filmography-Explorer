/* eslint-disable @typescript-eslint/no-explicit-any */
import { select } from 'd3-selection'
import { ScalePower, ScaleLinear } from 'd3-scale'

// Types
import { Delaunay } from 'd3-delaunay'
import { BubbleChartStoredValues, Margin } from '../../../../../types/chart'
import { FormattedPersonCreditDataObject } from '../../../../../types/person'

// Styles
import { colors, fontSize, circleRadius, circleFillOpacity, circleAdjust } from '../../../../../styles/variables'

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
    .selectAll('.main-circle')
    .data(data, (d: any) => d.id)
    .join(
      enter =>
        enter
          .append('g')
          .attr('class', 'main-circle')
          .append('circle')
          .attr('cx', d => xScale(new Date(d.unified_date)))
          .attr('cy', d => yScale(d.vote_average))
          .attr('r', d => (isSizeDynamic ? sizeScale(d.vote_count) : circleRadius))
          .attr('fill', colors.bgColorPrimaryLight)
          .attr('fill-opacity', circleFillOpacity)
          .attr('stroke', colors.bgColorSecondary)
      // TODO: setup when favoriting is back
      // .attr('fill',  => (favoriteMovies.includes(id) ? COLORS.favorite : COLORS.secondary))
      // .attr('stroke', ({ id }) => (favoriteMovies.includes(id) ? chroma(COLORS.favorite).darken() : chroma(COLORS.secondary).darken()))
    )
}

export interface VoronoiParams {
  storedValues: { current: BubbleChartStoredValues }
  data: FormattedPersonCreditDataObject[]
  margin: Margin
  width: number
  height: number
  activeMovieID: number
  addUpdateInteractions: () => void
}

export function createUpdateVoronoi({ storedValues, margin, data, width, height, activeMovieID, addUpdateInteractions }: VoronoiParams) {
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
  addUpdateInteractions()
}

export interface SetRadiusParams {
  sizeScale: ScalePower<number, number>
  adjust: number
  isSizeDynamic: boolean
}

export const setRadius = ({ adjust = 0, isSizeDynamic = true, sizeScale }: SetRadiusParams) => (d: any) =>
  isSizeDynamic ? sizeScale(d.vote_count) + adjust : 6 + adjust

export interface GetSelectedLineYPosParams {
  sizeScale: ScalePower<number, number>
  yScale: ScaleLinear<number, number>
  isSizeDynamic: boolean
  data: FormattedPersonCreditDataObject
  type: string
}

export const getSelectedLineYPos = ({ data, yScale, sizeScale, isSizeDynamic, type }: GetSelectedLineYPosParams) => {
  return type === 'main'
    ? yScale(data.vote_average) + setRadius({ adjust: 4, isSizeDynamic, sizeScale })(data)
    : yScale(data.vote_average) - setRadius({ adjust: 4, isSizeDynamic, sizeScale })(data)
}

export interface BubbleChartRefParams {
  storedValues: {
    current: BubbleChartStoredValues
  }
  activeMovieID: number
  data: FormattedPersonCreditDataObject[]
  type: string
  isSizeDynamic: boolean
  height: number
}

export function createBubbleChartRefElements({ activeMovieID, storedValues, data, type, isSizeDynamic, height }: BubbleChartRefParams) {
  const selectedData = data.find(d => d.id === activeMovieID)
  const { chartArea, xScale, yScale, sizeScale, voronoiArea } = storedValues.current
  if (selectedData) {
    chartArea.selectAll('.main-circle').each((d: any, i, n) => {
      if (d.id === activeMovieID) {
        const selection = select(n[i])
        const setX = () => xScale(new Date(d.unified_date))
        selection
          .append('circle')
          .datum(selectedData)
          .attr('class', 'selected-circle')
          .attr('cx', xScale(new Date(selectedData.unified_date)))
          .attr('cy', yScale(selectedData.vote_average))
          .attr('fill', 'transparent')
          .attr('stroke', colors.textColorPrimary)
          .attr('r', () =>
            setRadius({
              adjust: circleAdjust,
              isSizeDynamic,
              sizeScale
            })(selectedData)
          )
        chartArea.select('.selected-circle').lower()
        selection
          .append('line')
          .datum(selectedData)
          .attr('class', 'selected-line')
          .attr('x1', setX)
          .attr('x2', setX)
          .attr(
            'y1',
            getSelectedLineYPos({
              data: selectedData,
              yScale,
              sizeScale,
              isSizeDynamic,
              type
            })
          )
          .attr('y2', type === 'main' ? height : -height)
          .attr('stroke', colors.textColorPrimary)
      }
    })
    voronoiArea.selectAll('.voronoi-path').attr('cursor', (d: any) => (activeMovieID === d.id ? 'default' : 'pointer'))
  }
  if (!selectedData) {
    voronoiArea.selectAll('.voronoi-path').attr('cursor', 'pointer')
  }
}