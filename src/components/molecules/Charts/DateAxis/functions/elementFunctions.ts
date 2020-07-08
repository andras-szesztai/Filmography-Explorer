/* eslint-disable @typescript-eslint/no-explicit-any */
import { axisBottom } from 'd3-axis'
import { Delaunay } from 'd3-delaunay'
import { select } from 'd3-selection'
import { ScalePower, ScaleLinear } from 'd3-scale'

// Types

import { AxisStoredValues, BubbleChartStoredValues } from '../../../../../types/chart'
import { FormattedPersonCreditDataObject } from '../../../../../types/person'

// Styles
import { colors, fontSize, circleSizeRange, circleAdjust, circleFillOpacity } from '../../../../../styles/variables'

interface Params {
  storedValues: { current: AxisStoredValues }
  width: number
}

export function createDateAxis({ storedValues, width }: Params) {
  const { xScale, chartArea } = storedValues.current
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
        .attr('fill', colors.bgColorPrimaryLight)
        .attr('font-size', fontSize.sm)
        .attr('letter-spacing', 1)
    })
}

export interface VoronoiParams {
  addUpdateInteractions: () => void
  storedValues: {
    current: AxisStoredValues
  }
  left: number
  height: number
  width: number
  activeMovieID: number
}

export function createUpdateVoronoi({ addUpdateInteractions, storedValues, left, height, width, activeMovieID }: VoronoiParams) {
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
          .attr('cursor', d => (activeMovieID === d.id ? 'default' : 'pointer'))
          .attr('d', (_, i) => delaunay.renderCell(i))
          .call(e => e),
      update => update.call(u => u.transition().attr('d', (_, i) => delaunay.renderCell(i)))
    )
  addUpdateInteractions()
}

export interface DateAxisRefParams {
  storedValues: {
    current: AxisStoredValues
  }
  className: string
}

export function createDateAxisRefElements({ storedValues, className }: DateAxisRefParams) {
  const { hoverElementArea } = storedValues.current
  const strokeColor = colors.bgColorSecondary
  hoverElementArea
    .append('circle')
    .attr('class', `${className}-circle`)
    .attr('cy', 0)
    .attr('cx', 0)
    .attr('r', circleSizeRange[0] + circleAdjust)
    .attr('fill', colors.bgColorPrimary)
    .attr('stroke', strokeColor)
    .attr('stroke-width', 1)
    .attr('opacity', 0)
  hoverElementArea
    .append('circle')
    .attr('class', `${className}-circle`)
    .attr('cy', 0)
    .attr('cx', 0)
    .attr('r', circleSizeRange[0])
    .attr('fill', colors.bgColorPrimaryLight)
    .attr('fill-opacity', circleFillOpacity)
    .attr('stroke', colors.bgColorPrimaryLight)
    .attr('stroke-width', 1)
    .attr('opacity', 0)
  hoverElementArea
    .append('line')
    .attr('class', `${className}-top-line ${className}-line`)
    .attr('y1', -circleSizeRange[0] - circleAdjust)
    .attr('y2', -circleSizeRange[0] - circleAdjust)
    .attr('stroke', strokeColor)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('stroke-width', 1)
    .attr('opacity', 0)
  hoverElementArea
    .append('line')
    .attr('class', `${className}-bottom-line ${className}-line`)
    .attr('y1', circleSizeRange[0] + circleAdjust)
    .attr('y2', circleSizeRange[0] + circleAdjust)
    .attr('stroke', strokeColor)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('stroke-width', 1)
    .attr('opacity', 0)
  if (className === 'hovered') {
    hoverElementArea
      .append('line')
      .attr('class', `${className}-horizontal-line ${className}-line`)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('stroke', strokeColor)
      .attr('stroke-width', 1)
      .attr('opacity', 0)
  }
}

interface ShowRefElements {
  storedValues: {
    current: AxisStoredValues
  }
  activeMovieID: number
  height: number
}

export function showRefElements({ storedValues, activeMovieID, height }: ShowRefElements) {
  const { xScale, hoverElementArea, voronoiArea, uniqData, mainData, subData } = storedValues.current
  const setX = (d: any) => xScale(new Date(d.unified_date))
  const selectedCircleData = uniqData.find(d => d.id === activeMovieID)
  hoverElementArea
    .selectAll('.selected-circle')
    .datum(selectedCircleData)
    .attr('cx', setX)
    .attr('opacity', 1)
  const topLineData = mainData.filter(d => d.id === activeMovieID)
  const bottomLineData = subData.filter(d => d.id === activeMovieID)
  hoverElementArea
    .selectAll('.selected-line')
    .datum(selectedCircleData)
    .attr('x1', setX)
    .attr('x2', setX)
    .attr('opacity', 1)
  if (topLineData.length) {
    hoverElementArea.selectAll('.selected-top-line').attr('y2', -height / 2)
  } else {
    hoverElementArea.selectAll('.selected-top-line').attr('y2', -circleSizeRange[0] - circleAdjust)
  }
  if (bottomLineData.length) {
    hoverElementArea.selectAll('.selected-bottom-line').attr('y2', height / 2)
  } else {
    hoverElementArea.selectAll('.selected-bottom-line').attr('y2', circleSizeRange[0] + circleAdjust)
  }
  voronoiArea.selectAll('.voronoi-path').attr('cursor', (d: any) => (activeMovieID === d.id ? 'default' : 'pointer'))
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
          .attr('fill', '#fff')
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
    voronoiArea.selectAll('.voronoi-path').attr('cursor', activeMovieID === selectedData.id ? 'default' : 'pointer')
  }
  if (!selectedData) {
    voronoiArea.selectAll('.voronoi-path').attr('cursor', 'pointer')
  }
}
