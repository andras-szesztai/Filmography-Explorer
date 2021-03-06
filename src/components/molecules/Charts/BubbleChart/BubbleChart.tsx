/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { scaleLinear, scaleTime, scaleSqrt } from 'd3-scale'
import { select } from 'd3-selection'
import 'd3-transition'
import { css } from '@emotion/core'
import { useMeasure, usePrevious } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'

// Components
import { LabelContainer } from '../../../atoms'

// Utils
import {
  createUpdateGrid,
  createUpdateGridText,
  createUpdateCircles,
  createUpdateVoronoi,
  createBubbleChartRefElements,
  updateSelectedYPos
} from './functions/elementFunctions'
import { getXPosition } from '../../../../utils/chartHelpers'

// Actions
import { populateHoveredMovie, emptyHoveredMovie } from '../../../../reducer/personCreditsChartReducer/actions'
import { setActiveMovieID } from '../../../../reducer/movieReducer/actions'
import {
  populateBookmarkedHoveredMovie,
  emptyBookmarkedHoveredMovie,
  setBookmarkedActiveMovieID
} from '../../../../reducer/bookmarkedChartReducer/actions'

// Types
import { BubbleChartStoredValues, BubbleChartProps } from '../../../../types/chart'
import { CombinedState } from '../../../../types/state'
import { MovieObject } from '../../../../types/movie'

// Hooks
import { useChartResize, useHoveredUpdate, useActiveMovieIDUpdate, useBookmarkUpdate } from './hooks'

// Styles
import { chartSideMargins, circleSizeRange, fontSize, colors, circleFillOpacity, space, fontWeight } from '../../../../styles/variables'
import { duration } from '../../../../styles/animation'
import { makeYScaleDomain } from './functions/utills'

const margin = {
  top: space[6],
  bottom: space[6],
  ...chartSideMargins
}

export default function BubbleChart(props: BubbleChartProps) {
  const dispatch = useDispatch()
  const bookmarks = useSelector((state: CombinedState) => state.movieReducer.bookmarks)
  const { data, isSizeDynamic, type, activeMovieID, title, hoveredMovieID, genreFilter, personFilter, isBookmarkChart } = props
  const isYDomainSynced = useSelector((state: CombinedState) => state.chartSettingsReducer.isYAxisSynced)

  const storedValues = React.useRef({ isInit: true } as BubbleChartStoredValues)
  const [wrapperRef, { width, height }] = useMeasure<HTMLDivElement>()
  const svgRef = React.useRef<SVGSVGElement>(null)
  const chartAreaRef = React.useRef<SVGGElement>(null)
  const voronoiRef = React.useRef<SVGGElement>(null)
  const hoverElementAreaRef = React.useRef<SVGGElement>(null)
  const gridAreaRef = React.useRef<SVGGElement>(null)
  const timeOut = React.useRef(null as any)

  const [totalNumber, setTotalNumber] = React.useState(0)

  function addUpdateInteractions() {
    const { voronoiArea, xScale } = storedValues.current
    const populateHoveredFunc = isBookmarkChart ? populateBookmarkedHoveredMovie : populateHoveredMovie
    const emptyHoveredFunc = isBookmarkChart ? emptyBookmarkedHoveredMovie : emptyHoveredMovie
    const setActiveMovieIDFunc = isBookmarkChart ? setBookmarkedActiveMovieID : setActiveMovieID
    voronoiArea
      .selectAll('.voronoi-path')
      .on('mouseover', (d: any) => {
        const hovered = {
          id: d.id as number,
          data: d as MovieObject,
          yPosition: props.tooltipYPosition,
          xPosition: getXPosition({
            data: d,
            left: margin.left,
            width,
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
        if (activeMovieID !== d.id) {
          dispatch(
            setActiveMovieIDFunc({
              id: d.id,
              position: getXPosition({
                data: d,
                left: margin.left,
                width,
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

  React.useEffect(() => {
    if (storedValues.current.isInit && width) {
      const xScale = scaleTime()
        .domain(props.xScaleDomain)
        .range([0, width - margin.right - margin.left])
      const sizeScale = scaleSqrt()
        .domain(props.sizeScaleDomain)
        .range(circleSizeRange)
      const chartArea = select(chartAreaRef.current)
      const svgArea = select(svgRef.current)
      const gridArea = select(gridAreaRef.current)
      const hoverElementArea = select(hoverElementAreaRef.current)
      const voronoiArea = select(voronoiRef.current)
      const newFilteredData =
        genreFilter.length || (personFilter && personFilter.length)
          ? data
              .filter(d => (genreFilter.length ? d.genres.some(id => genreFilter.includes(id)) : true))
              .filter(d => (personFilter && personFilter.length ? d.credits && d.credits.some(id => personFilter.includes(id)) : true))
          : data
      const yScale = scaleLinear().range([height - margin.bottom - margin.top, 0])
      const newYScale = makeYScaleDomain({ data: newFilteredData, yScale, isYDomainSynced })
      storedValues.current = {
        isInit: false,
        sizeScale,
        xScale,
        yScale: newYScale,
        chartArea,
        svgArea,
        gridArea,
        hoverElementArea,
        voronoiArea,
        filteredData: newFilteredData
      }
      const gridArgs = { storedValues, left: margin.left, width }
      createUpdateGrid(gridArgs)
      createUpdateGridText(gridArgs)
      createUpdateCircles({
        storedValues,
        isSizeDynamic,
        bookmarks
      })
      createUpdateVoronoi({
        storedValues,
        margin,
        width,
        height,
        activeMovieID,
        addUpdateInteractions
      })
      setTotalNumber(newFilteredData.length)
      if (activeMovieID) {
        createBubbleChartRefElements({
          data,
          activeMovieID,
          storedValues,
          type,
          isSizeDynamic: props.isSizeDynamic,
          height
        })
      }
    }
  })

  React.useEffect(() => {
    if (!storedValues.current.isInit) {
      const { yScale } = storedValues.current
      const newFilteredData =
        genreFilter.length || (personFilter && personFilter.length)
          ? data
              .filter(d => (genreFilter.length ? d.genres.some(id => genreFilter.includes(id)) : true))
              .filter(d => (personFilter && personFilter.length ? d.credits && d.credits.some(id => personFilter.includes(id)) : true))
          : data
      const newYScale = makeYScaleDomain({ data: newFilteredData, yScale, isYDomainSynced })
      storedValues.current = {
        ...storedValues.current,
        yScale: newYScale,
        filteredData: newFilteredData
      }
      const gridArgs = { storedValues, left: margin.left, width }
      createUpdateGrid(gridArgs)
      createUpdateGridText(gridArgs)
      createUpdateCircles({
        storedValues,
        isSizeDynamic,
        bookmarks
      })
      createUpdateVoronoi({
        storedValues,
        margin,
        width,
        height,
        activeMovieID,
        addUpdateInteractions
      })
      if (newFilteredData.length !== totalNumber) {
        setTotalNumber(newFilteredData.length)
      }
      updateSelectedYPos({ isSizeDynamic, type, storedValues, height, activeMovieID })
    }
  }, [genreFilter, personFilter])

  useChartResize({
    width,
    height,
    storedValues,
    margin,
    type,
    isSizeDynamic,
    updateVoronoi: () =>
      createUpdateVoronoi({
        storedValues,
        margin,
        width,
        height,
        activeMovieID,
        addUpdateInteractions
      })
  })

  useActiveMovieIDUpdate({
    storedValues,
    activeMovieID,
    isSizeDynamic,
    type,
    height,
    data
  })

  useHoveredUpdate({
    storedValues,
    height,
    type,
    isSizeDynamic,
    addUpdateInteractions,
    isBookmarkChart
  })

  useBookmarkUpdate({
    storedValues,
    bookmarks
  })

  const prevProps = usePrevious(props)
  React.useEffect(() => {
    if (!storedValues.current.isInit && prevProps && props.isFirstEntered !== prevProps.isFirstEntered) {
      addUpdateInteractions()
    }
  })

  // y domain toggle update
  React.useEffect(() => {
    if (!storedValues.current.isInit) {
      const { yScale, filteredData } = storedValues.current
      const newYScale = makeYScaleDomain({ data: filteredData, yScale, isYDomainSynced })
      storedValues.current = {
        ...storedValues.current,
        yScale: newYScale
      }
      const gridArgs = { storedValues, left: margin.left, width }
      createUpdateGrid(gridArgs)
      createUpdateGridText(gridArgs)
      createUpdateCircles({
        storedValues,
        isSizeDynamic,
        bookmarks
      })
      createUpdateVoronoi({
        storedValues,
        margin,
        width,
        height,
        activeMovieID,
        addUpdateInteractions
      })
      updateSelectedYPos({ isSizeDynamic, type, storedValues, height, activeMovieID })
    }
  }, [isYDomainSynced])

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
      <div
        css={css`
          position: absolute;
          pointer-events: none;
        `}
      >
        <div
          css={css`
            font-size: ${fontSize.charTitle};
            line-height: 0.8;
            font-weight: 500;
            text-transform: uppercase;
            color: ${colors.bgColorPrimaryLight};
            position: absolute;
            left: -${space[1] + 2}px;
            top: -${space[1]}px;
            opacity: ${circleFillOpacity};
          `}
        >
          {title}
        </div>
        <div
          css={css`
            position: relative;
          `}
        >
          <div
            css={css`
              font-size: ${fontSize.xxl};
              line-height: 0.75;
              font-weight: ${fontWeight.lg};
              text-transform: uppercase;
              letter-spacing: 2px;
              color: ${colors.bgColorSecondary};
              position: absolute;
              top: 8px;
            `}
          >
            {totalNumber ? totalNumber.toString().padStart(3, '0') : '000'}
          </div>
          {totalNumber > 1 && (
            <div
              css={css`
                font-size: ${fontSize.sm};
                line-height: 0.75;
                letter-spacing: 2px;
                font-weight: ${fontWeight.md};
                text-transform: uppercase;
                color: ${colors.bgColorSecondary};
                position: absolute;
                top: 36px;
              `}
            >
              Titles
            </div>
          )}
        </div>
      </div>
      <svg
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
        `}
        ref={svgRef}
      >
        <g
          ref={gridAreaRef}
          css={css`
            transform: translate(${margin.left}px, ${margin.top}px);
          `}
        />
        <g
          ref={chartAreaRef}
          css={css`
            transform: translate(${margin.left}px, ${margin.top}px);
          `}
        />
        <g
          css={css`
            transform: translate(${margin.left}px, ${margin.top}px);
          `}
          ref={hoverElementAreaRef}
        />
        <g ref={voronoiRef} />
      </svg>
      <LabelContainer label="Avg. user score" />
    </div>
  )
}
