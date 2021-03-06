/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { select } from 'd3-selection'
import { useMeasure, usePrevious } from 'react-use'
import 'd3-transition'
import uniqBy from 'lodash/uniqBy'
import { scaleTime } from 'd3-scale'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'

// Components
import MoviesTooltip from '../../MoviesTooltip/MoviesTooltip'

// Utils
import { getYPosition, getXPosition } from '../../../../utils/chartHelpers'
import { createDateAxis, createUpdateVoronoi, createDateAxisRefElements, showRefElements } from './functions/elementFunctions'

// Actions
import { setActiveMovieID } from '../../../../reducer/movieReducer/actions'
import { populateHoveredMovie, emptyHoveredMovie } from '../../../../reducer/personCreditsChartReducer/actions'
import {
  populateBookmarkedHoveredMovie,
  emptyBookmarkedHoveredMovie,
  setBookmarkedActiveMovieID
} from '../../../../reducer/bookmarkedChartReducer/actions'

// Hooks
import { useChartResize, useSelectedUpdate, useHoveredUpdate } from './hooks'

// Types
import { AxisStoredValues, DateAxisProps } from '../../../../types/chart'
import { MovieObject } from '../../../../types/movie'

// Styles
import { chartSideMargins } from '../../../../styles/variables'
import { duration } from '../../../../styles/animation'

const margin = {
  top: 20,
  bottom: 20,
  ...chartSideMargins
}

export default function DateAxis(props: DateAxisProps) {
  const dispatch = useDispatch()
  const { dataSets, activeMovieID, hoveredMovieID, genreFilter, tooltipWithRole, isBookmarkChart, personFilter } = props

  const storedValues = React.useRef({ isInit: true } as AxisStoredValues)
  const [wrapperRef, dims] = useMeasure<HTMLDivElement>()
  const svgRef = React.useRef<SVGSVGElement>(null)
  const chartAreaRef = React.useRef<SVGGElement>(null)
  const voronoiRef = React.useRef<SVGGElement>(null)
  const hoverElementAreaRef = React.useRef<SVGGElement>(null)
  const timeOut = React.useRef(null as any)

  function addUpdateInteractions() {
    const { voronoiArea, mainData, xScale } = storedValues.current
    const populateHoveredFunc = props.isBookmarkChart ? populateBookmarkedHoveredMovie : populateHoveredMovie
    const emptyHoveredFunc = props.isBookmarkChart ? emptyBookmarkedHoveredMovie : emptyHoveredMovie
    const setActiveMovieIDFunc = props.isBookmarkChart ? setBookmarkedActiveMovieID : setActiveMovieID
    voronoiArea
      .selectAll('.voronoi-path')
      .on('mouseover', (d: any) => {
        const hovered = {
          id: d.id as number,
          data: d as MovieObject,
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
          dispatch(populateHoveredFunc(hovered))
        }
        if (props.isFirstEntered) {
          timeOut.current = setTimeout(() => {
            props.setIsFirstEntered(false)
            dispatch(populateHoveredFunc(hovered))
          }, duration.md)
        }
      })
      .on('mouseout', () => {
        clearTimeout(timeOut.current)
        if (hoveredMovieID) {
          dispatch(emptyHoveredFunc())
        }
      })
      .on('click', (d: any) => {
        if (props.activeMovieID !== d.id) {
          dispatch(
            setActiveMovieIDFunc({
              id: d.id,
              position: getXPosition({
                data: d,
                left: margin.left,
                width: dims.width,
                xScale
              }),
              mediaType: d.media_type
            })
          )
          clearTimeout(timeOut.current)
          props.setIsFirstEntered(true)
        }
      })
  }

  function runElementUpdate() {
    createDateAxis({ storedValues, width: dims.width })
    createUpdateVoronoi({ addUpdateInteractions, storedValues, left: margin.left, height: dims.height, width: dims.width, activeMovieID })
    if (activeMovieID) {
      showRefElements({ storedValues, activeMovieID, height: dims.height })
    }
  }

  React.useEffect(() => {
    if (storedValues.current.isInit && dims.width) {
      storedValues.current.isInit = false
      let uniqData
      let filteredMainData
      let filteredSubData
      if (Array.isArray(dataSets)) {
        uniqData = dataSets
        filteredMainData =
          genreFilter.length || (personFilter && personFilter.length)
            ? dataSets
                .filter(d => (genreFilter.length ? d.genres.some(id => genreFilter.includes(id)) : true))
                .filter(d => (personFilter && personFilter.length ? d.credits && d.credits.some(id => personFilter.includes(id)) : true))
            : dataSets
        filteredSubData = []
      }
      if (!Array.isArray(dataSets)) {
        const isCast = dataSets.cast.length >= dataSets.crew.length
        const mainData = isCast ? dataSets.cast : dataSets.crew
        const subData = isCast ? dataSets.crew : dataSets.cast
        filteredMainData = genreFilter.length ? mainData.filter(d => d.genres.some(id => genreFilter.includes(id))) : mainData // TODO: Dry
        filteredSubData = genreFilter.length ? subData.filter(d => d.genres.some(id => genreFilter.includes(id))) : subData
        uniqData = uniqBy([...filteredMainData, ...filteredSubData], 'id')
      }
      const xScale = scaleTime()
        .domain(props.xScaleDomain)
        .range([0, dims.width - margin.left - margin.right])
      const chartArea = select(chartAreaRef.current)
      const svgArea = select(svgRef.current)
      const hoverElementArea = select(hoverElementAreaRef.current)
      const voronoiArea = select(voronoiRef.current)
      storedValues.current = {
        isInit: false,
        xScale,
        mainData: filteredMainData,
        subData: filteredSubData,
        uniqData,
        chartArea,
        svgArea,
        voronoiArea,
        hoverElementArea
      }
      createDateAxisRefElements({ storedValues, className: 'hovered' })
      createDateAxisRefElements({ storedValues, className: 'selected' })
      if (activeMovieID) {
        showRefElements({
          storedValues,
          activeMovieID,
          height: dims.height
        })
      }
    }
  })

  React.useEffect(() => {
    if (!storedValues.current.isInit) {
      let uniqData
      let filteredMainData
      let filteredSubData
      if (Array.isArray(dataSets)) {
        uniqData = dataSets
        filteredMainData =
          genreFilter.length || (personFilter && personFilter.length)
            ? dataSets
                .filter(d => (genreFilter.length ? d.genres.some(id => genreFilter.includes(id)) : true))
                .filter(d => (personFilter && personFilter.length ? d.credits && d.credits.some(id => personFilter.includes(id)) : true))
            : dataSets
        filteredSubData = []
      }
      if (!Array.isArray(dataSets)) {
        const isCast = dataSets.cast.length >= dataSets.crew.length
        const mainData = isCast ? dataSets.cast : dataSets.crew
        const subData = isCast ? dataSets.crew : dataSets.cast
        filteredMainData = genreFilter.length ? mainData.filter(d => d.genres.some(id => genreFilter.includes(id))) : mainData // TODO: Dry
        filteredSubData = genreFilter.length ? subData.filter(d => d.genres.some(id => genreFilter.includes(id))) : subData
        uniqData = uniqBy([...filteredMainData, ...filteredSubData], 'id')
      }
      storedValues.current = {
        ...storedValues.current,
        uniqData,
        mainData: filteredMainData,
        subData: filteredSubData
      }
      createUpdateVoronoi({
        addUpdateInteractions,
        storedValues,
        left: margin.left,
        height: dims.height,
        width: dims.width,
        activeMovieID
      })
    }
  }, [genreFilter, personFilter])

  useChartResize({
    width: dims.width,
    storedValues,
    margin,
    runElementUpdate
  })

  useSelectedUpdate({
    storedValues,
    activeMovieID,
    height: dims.height,
    addUpdateInteractions
  })

  useHoveredUpdate({
    storedValues,
    height: dims.height,
    addUpdateInteractions,
    isBookmarkChart
  })

  const prevProps = usePrevious(props)
  React.useEffect(() => {
    if (!storedValues.current.isInit && prevProps && props.isFirstEntered !== prevProps.isFirstEntered) {
      addUpdateInteractions()
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
      <MoviesTooltip
        withRole={tooltipWithRole}
        xScale={storedValues.current.xScale}
        activeMovieID={activeMovieID}
        isBookmarkChart={isBookmarkChart}
      />
    </div>
  )
}
