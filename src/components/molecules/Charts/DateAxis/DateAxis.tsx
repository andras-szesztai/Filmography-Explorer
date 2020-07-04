/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import chroma from 'chroma-js'
import { select, Selection } from 'd3-selection'
import { useMeasure, usePrevious } from 'react-use'
import 'd3-transition'
import uniqBy from 'lodash/uniqBy'
import { axisBottom } from 'd3-axis'
import { Delaunay } from 'd3-delaunay'
import { scaleTime, ScaleTime } from 'd3-scale'

import { css } from '@emotion/core'
import { FormattedPersonCreditDataObject, PersonCredits } from '../../../../types/person'
import { LabelContainer } from '../../../atoms'
import { chartSideMargins, colors, fontSize } from '../../../../styles/variables'

const margin = {
  top: 20,
  bottom: 20,
  ...chartSideMargins
}
interface Props {
  dataSets: PersonCredits
  xScaleDomain: Date[]
}

export interface StoredValues {
  isInit: boolean
  xScale: ScaleTime<number, number>
  mainData: FormattedPersonCreditDataObject[]
  subData: FormattedPersonCreditDataObject[]
  uniqData: FormattedPersonCreditDataObject[]
  svgArea: Selection<SVGSVGElement | any, any, any, any>
  chartArea: Selection<SVGGElement | any, any, any, any>
  voronoiArea: Selection<SVGGElement | any, any, any, any>
}

export default function DateAxis(props: Props) {
  const { dataSets, xScaleDomain } = props
  const prevProps = usePrevious(props)
  const storedValues = React.useRef({ isInit: true } as StoredValues)
  const [wrapperRef, dims] = useMeasure<HTMLDivElement>()
  const svgRef = React.useRef<SVGSVGElement>(null)
  const chartAreaRef = React.useRef<SVGGElement>(null)
  const voronoiRef = React.useRef<SVGGElement>(null)

  // function createUpdateVoronoi() {
  //   const { currXScale, filteredData, voronoiArea } = storedValues.current
  //   const setXPos = d => currXScale(new Date(d.unified_date)) + margin.left
  //   const delaunay = Delaunay.from(filteredData, setXPos, () => dims.height / 2).voronoi([0, 0, dims.width, dims.height])

  //   voronoiArea
  //     .selectAll('.voronoi-path')
  //     .data(filteredData, d => d.id)
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

  React.useEffect(() => {
    if (storedValues.current.isInit && dims.width) {
      storedValues.current.isInit = false
      const isCast = dataSets.cast.length >= dataSets.crew.length
      const mainData = isCast ? dataSets.cast : dataSets.crew
      const subData = isCast ? dataSets.crew : dataSets.cast
      const uniqData = uniqBy([...mainData, ...subData], 'id')
      const xScale = scaleTime()
        .domain(xScaleDomain)
        .range([0, dims.width - margin.left - margin.right])
      const chartArea = select(chartAreaRef.current)
      const svgArea = select(svgRef.current)
      const voronoiArea = select(voronoiRef.current)
      storedValues.current = {
        isInit: false,
        xScale,
        mainData,
        subData,
        uniqData,
        chartArea,
        svgArea,
        voronoiArea
      }
      createDateAxis()
      createUpdateVoronoi()
      // createRefElements('hovered')
      // createRefElements('selected')
      // if (activeMovie.id) {
      //   showRefElements({
      //     storedValues,
      //     activeMovieID: activeMovie.id,
      //     filteredData,
      //     mainData,
      //     subData,
      //     height: dims.height
      //   })
      // }
    }
  })

  // function createRefElements(className) {
  //   const { chartArea } = storedValues.current
  //   const strokeColor = className === 'hovered' ? COLORS.secondary : chroma(COLORS.secondary).darken()
  //   chartArea
  //     .append('circle')
  //     .attr('class', `${className}-circle`)
  //     .attr('cy', 0)
  //     .attr('cx', 0)
  //     .attr('r', SIZE_RANGE[0] + CIRCLE_ADJUST)
  //     .attr('fill', '#fff')
  //     .attr('stroke', strokeColor)
  //     .attr('stroke-width', 1)
  //     .attr('opacity', 0)
  //   chartArea
  //     .append('circle')
  //     .attr('class', `${className}-circle`)
  //     .attr('cy', 0)
  //     .attr('cx', 0)
  //     .attr('r', SIZE_RANGE[0])
  //     .attr('fill', COLORS.secondary)
  //     .attr('stroke', strokeColor)
  //     .attr('stroke-width', 1)
  //     .attr('opacity', 0)
  //   chartArea
  //     .append('line')
  //     .attr('class', `${className}-top-line ${className}-line`)
  //     .attr('y1', -SIZE_RANGE[0] - CIRCLE_ADJUST)
  //     .attr('y2', -SIZE_RANGE[0] - CIRCLE_ADJUST)
  //     .attr('stroke', strokeColor)
  //     .attr('x1', 0)
  //     .attr('x2', 0)
  //     .attr('stroke-width', 1)
  //     .attr('opacity', 0)
  //   chartArea
  //     .append('line')
  //     .attr('class', `${className}-bottom-line ${className}-line`)
  //     .attr('y1', SIZE_RANGE[0] + CIRCLE_ADJUST)
  //     .attr('y2', SIZE_RANGE[0] + CIRCLE_ADJUST)
  //     .attr('stroke', strokeColor)
  //     .attr('x1', 0)
  //     .attr('x2', 0)
  //     .attr('stroke-width', 1)
  //     .attr('opacity', 0)
  //   if (className === 'hovered') {
  //     chartArea
  //       .append('line')
  //       .attr('class', `${className}-horizontal-line ${className}-line`)
  //       .attr('y1', 0)
  //       .attr('y2', 0)
  //       .attr('x1', 0)
  //       .attr('x2', 0)
  //       .attr('stroke', strokeColor)
  //       .attr('stroke-width', 1)
  //       .attr('opacity', 0)
  //   }
  // }

  // function getXPosition(d) {
  //   const { currXScale } = storedValues.current
  //   return Number(currXScale(new Date(d.unified_date)) + margin.left >= dims.width / 2)
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
  //           yPosition: makeYPosition({
  //             data: d,
  //             mainData,
  //             isBoth: props.isBoth
  //           }),
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
  //     .on('click', d => {
  //       props.setActiveMovie({
  //         id: d.id,
  //         data: d,
  //         position: getXPosition(d)
  //       })
  //     })
  // }

  // useChartResize({
  //   dims,
  //   storedValues,
  //   margin,
  //   createUpdateVoronoi,
  //   createDateAxis
  // })

  // useSelectedUpdate({
  //   storedValues,
  //   activeMovieID: activeMovie.id,
  //   prevActiveMovieID: prevProps && prevProps.activeMovie.id,
  //   type: props.type,
  //   data: { mainData, subData },
  //   dims,
  //   addUpdateInteractions
  // })

  // useHoveredUpdate({
  //   storedValues,
  //   hoveredMovie,
  //   prevHoveredMovie: prevProps && prevProps.hoveredMovie,
  //   dims,
  //   mainData,
  //   addUpdateInteractions
  // })

  // useEffect(() => {
  //   if (storedValues.current.isInit && props.isFirstEntered !== prevProps.isFirstEntered) {
  //     addUpdateInteractions()
  //   }
  // })

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
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
          style={{
            transform: `translate(${margin?.left}px,${dims.height / 2}px)`
          }}
        />
        <g ref={voronoiRef} />
      </svg>
      <LabelContainer label="Release year" left={5} />
    </div>

    // <Tooltip xScale={storedValues && storedValues.current.currXScale} hoveredMovie={props.hoveredMovie} activeMovieID={activeMovie.id} />
  )
}
