/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import chroma from 'chroma-js'
import { select, Selection, ValueFn } from 'd3-selection'
import { useMeasure, usePrevious } from 'react-use'
import 'd3-transition'
import uniqBy from 'lodash/uniqBy'
import { axisBottom } from 'd3-axis'
import { Delaunay } from 'd3-delaunay'
import { scaleTime, ScaleTime } from 'd3-scale'

import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'
import { FormattedPersonCreditDataObject, PersonCredits } from '../../../../types/person'
import { LabelContainer } from '../../../atoms'
import { chartSideMargins, colors, fontSize } from '../../../../styles/variables'
import { duration } from '../../../../styles/animation'
import { AxisStoredValues } from '../../../../types/chart'
import { createDateAxis, createUpdateVoronoi } from './functions/elementFunctions'
import { getYPosition, getXPosition } from '../../../../utils/chartHelpers'
import { populateHoveredMovie, emptyHoveredMovie } from '../../../../reducer/personCreditsChartReducer/actions'

// TODO: set it up, fix optional chaining instances
const margin = {
  top: 20,
  bottom: 20,
  ...chartSideMargins
}
interface Props {
  dataSets: PersonCredits
  xScaleDomain: Date[]
  isBoth: boolean
  isFirstEntered: boolean
  setIsFirstEntered: (bool: boolean) => void
}

export default function DateAxis(props: Props) {
  const { dataSets, xScaleDomain } = props
  const dispatch = useDispatch()
  const prevProps = usePrevious(props)
  const storedValues = React.useRef({ isInit: true } as AxisStoredValues)
  const [wrapperRef, dims] = useMeasure<HTMLDivElement>()
  const svgRef = React.useRef<SVGSVGElement>(null)
  const chartAreaRef = React.useRef<SVGGElement>(null)
  const voronoiRef = React.useRef<SVGGElement>(null)
  const timeOut = React.useRef(null as any)

  function addUpdateInteractions() {
    const { voronoiArea, mainData, xScale } = storedValues.current
    voronoiArea
      .selectAll('.voronoi-path')
      .on('mouseover', (d: any) => {
        const hovered = {
          id: d.id as number,
          data: d as FormattedPersonCreditDataObject,
          yPosition: getYPosition({
            data: d,
            mainData,
            isBoth: props.isBoth
          }),
          xPosition: getXPosition({
            data: d,
            left: margin.left,
            width: dims.width,
            xScale
          })
        }
        if (!props.isFirstEntered) {
          dispatch(populateHoveredMovie(hovered))
        }
        if (props.isFirstEntered) {
          timeOut.current = setTimeout(() => {
            props.setIsFirstEntered(false)
            dispatch(populateHoveredMovie(hovered))
          }, duration.sm)
        }
      })
      .on('mouseout', () => {
        clearTimeout(timeOut.current)
        dispatch(emptyHoveredMovie())
      })
    // TODO: Setup click
    // .on('click', d => {
    //   props.setActiveMovie({
    //     id: d.id,
    //     data: d,
    //     position: getXPosition(d)
    //   })
    // })
  }

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
      createDateAxis({ storedValues: storedValues.current, width: dims.width })
      createUpdateVoronoi({ addUpdateInteractions, storedValues, left: margin.left, height: dims.height, width: dims.width })
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
          style={{
            transform: `translate(${margin.left}px,${dims.height / 2}px)`
          }}
        />
        <g ref={voronoiRef} />
      </svg>
      <LabelContainer label="Release year" left={0} />
    </div>

    // <Tooltip xScale={storedValues && storedValues.current.currXScale} hoveredMovie={props.hoveredMovie} activeMovieID={activeMovie.id} />
  )
}
