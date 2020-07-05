/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react'
import chroma from 'chroma-js'
import { scaleLinear, scaleTime, scaleSqrt } from 'd3-scale'
import { extent } from 'd3-array'
import { select } from 'd3-selection'
import { useMeasure, usePrevious } from 'react-use'
import 'd3-transition'
import { Delaunay } from 'd3-delaunay'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'

// Types
import { maxBy, minBy } from 'lodash'
import { BubbleChartStoredValues } from '../../../../types/chart'
import { chartSideMargins, circleSizeRange } from '../../../../styles/variables'
import { FormattedPersonCreditDataObject } from '../../../../types/person'

const margin = {
  top: 20,
  bottom: 20,
  ...chartSideMargins
}

const gridData = [0, 2, 4, 6, 8, 10]

interface Props {
  xScaleDomain: Date[]
  sizeScaleDomain: number[]
  isFirstEntered: boolean
  isYDomainSynced: boolean
  data: FormattedPersonCreditDataObject[]
  // dataSets: PersonCredits
  // isBoth: boolean
  // isFirstEntered: boolean
  // setIsFirstEntered: (bool: boolean) => void
  // activeMovieID: number
}

export default function BubbleChart(props: Props) {
  const dispatch = useDispatch()
  const { data } = props

  const storedValues = React.useRef({ isInit: true } as BubbleChartStoredValues)
  const [wrapperRef, dims] = useMeasure<HTMLDivElement>()
  const svgRef = React.useRef<SVGSVGElement>(null)
  const chartAreaRef = React.useRef<SVGGElement>(null)
  const voronoiRef = React.useRef<SVGGElement>(null)
  const hoverElementAreaRef = React.useRef<SVGGElement>(null)
  const timeOut = React.useRef(null as any)

  const [totalNumber, setTotalNumber] = useState(undefined)

  React.useEffect(() => {
    if (storedValues.current.isInit && dims.width) {
      const xScale = scaleTime()
        .domain(props.xScaleDomain)
        .range([0, dims.width - margin.left - margin.right])
      const yMax = maxBy(props.data, d => d.vote_count)
      const yMin = minBy(props.data, d => d.vote_count)
      const yScaleDomain = [(yMin && yMin.vote_count) || 0, (yMax && yMax.vote_count) || 0]
      const yScale = scaleLinear()
        .domain(props.isYDomainSynced ? [0, 10] : yScaleDomain)
        .range([dims.height - margin.top - margin.bottom, 0])
      const sizeScale = scaleSqrt()
        .domain(props.sizeScaleDomain)
        .range(circleSizeRange)
      // const chartArea = select(chartAreaRef.current)
      // const svgArea = select(svgAreaRef.current)
      // const gridArea = select(gridAreaRef.current)
      // const voronoiArea = select(voronoiRef.current)
      // storedValues.current = {
      //   isInit: true,
      //   currXScale,
      //   currSizeScale,
      //   yScale,
      //   chartArea,
      //   svgArea,
      //   gridArea,
      //   voronoiArea
      // }
      // createGrid()
      // createGridText()
      // createCircles()
      // createUpdateVoronoi()
      // setNumber(data.length)
      // if (props.activeMovie.id) {
      //   createRefElements({
      //     data,
      //     activeMovieID: props.activeMovie.id,
      //     storedValues,
      //     chart,
      //     isSizeDynamic,
      //     height: dims.height
      //   })
      // }
    }
  })

  // function createCircles() {
  //   const { currXScale, currSizeScale, yScale, chartArea } = storedValues.current

  //   chartArea
  //     .selectAll('.main-circle')
  //     .data(data, d => d.id)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'main-circle')

  //   chartArea
  //     .selectAll('.main-circle')
  //     .append('circle')
  //     .attr('class', 'circle')
  //     .attr('cx', ({ unified_date }) => currXScale(new Date(unified_date)))
  //     .attr('cy', ({ vote_average }) => yScale(vote_average))
  //     .attr('r', d => setRadius({ props, currSizeScale, isSizeDynamic })(d))
  //     .attr('fill', ({ id }) => (favoriteMovies.includes(id) ? COLORS.favorite : COLORS.secondary))
  //     .attr('stroke', ({ id }) => (favoriteMovies.includes(id) ? chroma(COLORS.favorite).darken() : chroma(COLORS.secondary).darken()))
  //     .attr('stroke-width', 1)
  // }

  // function createGrid() {
  //   storedValues.current.gridArea
  //     .selectAll('.grid-line')
  //     .data(gridData, d => d)
  //     .enter()
  //     .append('line')
  //     .attr('class', 'grid-line')
  //     .attr('x1', -margin.left)
  //     .attr('x2', dims.width)
  //     .attr('y1', d => storedValues.current.yScale(d))
  //     .attr('y2', d => storedValues.current.yScale(d))
  //     .attr('stroke', COLORS.gridColor)
  //     .attr('stroke-width', 0.25)
  // }

  // function createGridText() {
  //   storedValues.current.gridArea
  //     .selectAll('.grid-text')
  //     .data(gridData, d => d)
  //     .enter()
  //     .append('text')
  //     .attr('class', 'grid-text')
  //     .attr('x', dims.width - margin.left)
  //     .attr('y', d => storedValues.current.yScale(d))
  //     .attr('dy', d => (d < 5 ? -4 : 12))
  //     .attr('text-anchor', 'end')
  //     .attr('font-size', fontSize[1])
  //     .attr('fill', COLORS.gridColor)
  //     .text(d => d)
  // }

  // function getXPosition(d) {
  //   const { currXScale } = storedValues.current
  //   return Number(currXScale(new Date(d.unified_date)) + margin.left >= dims.width / 2)
  // }

  // function setActiveMovie(d) {
  //   props.activeMovie.id !== d.id &&
  //     props.setActiveMovie({
  //       id: d.id,
  //       data: d,
  //       position: getXPosition(d)
  //     })
  // }

  // const timeOut = useRef(null)

  // function addUpdateInteractions() {
  //   const { voronoiArea } = storedValues.current

  //   voronoiArea
  //     .selectAll('.voronoi-path')
  //     .on('mouseover', d => {
  //       const setHoveredMovie = () =>
  //         props.setHoveredMovie({
  //           id: d.id,
  //           data: d,
  //           yPosition: props.tooltipYPosition,
  //           xPosition: getXPosition(d)
  //         })
  //       if (!props.isFirstEntered) {
  //         setHoveredMovie()
  //       }
  //       if (props.isFirstEntered) {
  //         timeOut.current = setTimeout(() => {
  //           props.setIsFirstEntered(false)
  //           setHoveredMovie()
  //         }, TIMEOUT.short)
  //       }
  //     })
  //     .on('mouseout', () => {
  //       clearTimeout(timeOut.current)
  //       props.setHoveredMovie(NO_HOVERED_MOVIE)
  //     })
  //     .on('click', setActiveMovie)
  // }

  // function createUpdateVoronoi() {
  //   const { yScale, currXScale, voronoiArea } = storedValues.current
  //   const setXPos = d => currXScale(new Date(d.unified_date)) + margin.left
  //   const setYPos = d => yScale(d.vote_average) + margin.top
  //   const delaunay = Delaunay.from(data, setXPos, setYPos).voronoi([0, 0, dims.width, dims.height])

  //   voronoiArea
  //     .selectAll('.voronoi-path')
  //     .data(data, d => d.id)
  //     .join(
  //       enter =>
  //         enter
  //           .append('path')
  //           .attr('class', 'voronoi-path')
  //           .attr('fill', 'transparent')
  //           .attr('cursor', d => (props.activeMovie.id === d.id ? 'default' : 'pointer'))
  //           .attr('d', (_, i) => delaunay.renderCell(i))
  //           .call(enter => enter),
  //       update => update.call(update => update.transition().attr('d', (_, i) => delaunay.renderCell(i)))
  //     )
  //   addUpdateInteractions()
  // }

  // useYDomainSyncUpdate({
  //   storedValues,
  //   isYDomainSynced,
  //   prevIsYDomainSynced: prevProps && prevProps.isYDomainSynced,
  //   isSizeDynamic,
  //   createUpdateVoronoi,
  //   chart,
  //   data
  // })
  // useRadiusUpdate({
  //   storedValues,
  //   chart,
  //   isSizeDynamic,
  //   prevIsSizeDynamic: prevProps && prevProps.isSizeDynamic
  // })
  // useChartResize({
  //   dims,
  //   prevDims,
  //   storedValues,
  //   margin,
  //   createUpdateVoronoi,
  //   chart,
  //   isSizeDynamic
  // })
  // useActiveMovieIDUpdate({
  //   storedValues,
  //   setActiveMovie,
  //   activeMovieID: props.activeMovie.id,
  //   prevActiveMovieID: prevProps && prevProps.activeMovie.id,
  //   isSizeDynamic,
  //   chart,
  //   dims,
  //   addUpdateInteractions,
  //   data
  // })
  // useHoveredUpdate({
  //   storedValues,
  //   isSizeDynamic,
  //   hoveredMovie: props.hoveredMovie,
  //   prevHoveredMovie: prevProps && prevProps.hoveredMovie,
  //   chart,
  //   dims,
  //   addUpdateInteractions
  // })

  // useFavoriteUpdate({
  //   storedValues,
  //   favoriteMovies
  // })

  const prevProps = usePrevious(props)
  React.useEffect(() => {
    if (!storedValues.current.isInit && prevProps && props.isFirstEntered !== prevProps.isFirstEntered) {
      // addUpdateInteractions()
    }
  })

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        user-select: none;
      `}
      ref={wrapperRef}
    >
      <svg
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
        `}
        ref={svgRef}
      >
        <g
          ref={chartAreaRef}
          css={css`
            transform: translate(${margin.left}px, ${dims.height / 2}px);
          `}
        />
        <g
          css={css`
            transform: translate(${margin.left}px, ${dims.height / 2}px);
          `}
          ref={hoverElementAreaRef}
        />
        <g ref={voronoiRef} />
      </svg>
      {/* <ChartTitle>
        <div style={{ position: 'absolute', opacity: 0.1 }}>{type}</div>
        <div style={{ position: 'relative' }}>
          <NumberContainer>{number && number.toString().padStart(3, '0')}</NumberContainer>
        </div>
      </ChartTitle>  */}
      {/* <LabelContainer>Avg. user score</LabelContainer>  */}
    </div>
  )
}
