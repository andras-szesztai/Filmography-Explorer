/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { scaleLinear, scaleTime, scaleSqrt } from 'd3-scale'
import { select } from 'd3-selection'
import { useMeasure, usePrevious } from 'react-use'
import 'd3-transition'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { maxBy, minBy } from 'lodash'

// Components
import { LabelContainer } from '../../../atoms'

// Utils
import {
  createUpdateGrid,
  createUpdateGridText,
  createUpdateCircles,
  createUpdateVoronoi,
  createBubbleChartRefElements
} from './functions/elementFunctions'
import { getXPosition } from '../../../../utils/chartHelpers'

// Actions
import { populateHoveredMovie, emptyHoveredMovie } from '../../../../reducer/personCreditsChartReducer/actions'
import { setActiveMovieID } from '../../../../reducer/movieReducer/actions'

// Types
import { BubbleChartStoredValues, BubbleChartProps } from '../../../../types/chart'
import { FormattedPersonCreditDataObject } from '../../../../types/person'

// Hooks
import { useChartResize, useHoveredUpdate, useActiveMovieIDUpdate, useBookmarkUpdate } from './hooks'

// Styles
import { chartSideMargins, circleSizeRange, fontSize, colors, circleFillOpacity } from '../../../../styles/variables'
import { duration } from '../../../../styles/animation'
import { CombinedState } from '../../../../types/state'

const margin = {
  top: 5,
  bottom: 5,
  ...chartSideMargins
}

export default function BubbleChart(props: BubbleChartProps) {
  const dispatch = useDispatch()
  const bookmarks = useSelector((state: CombinedState) => state.movieReducer.bookmarks)
  const { data, isSizeDynamic, type, activeMovieID, title, hoveredMovieID, genreFilter } = props

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

    voronoiArea
      .selectAll('.voronoi-path')
      .on('mouseover', (d: any) => {
        const hovered = {
          id: d.id as number,
          data: d as FormattedPersonCreditDataObject,
          yPosition: props.tooltipYPosition,
          xPosition: getXPosition({
            data: d,
            left: margin.left,
            width,
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
        if (hoveredMovieID) {
          dispatch(emptyHoveredMovie())
        }
      })
      .on('click', (d: any) => {
        if (activeMovieID !== d.id) {
          dispatch(
            setActiveMovieID({
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
        }
      })
  }

  React.useEffect(() => {
    if (storedValues.current.isInit && width) {
      const xScale = scaleTime()
        .domain(props.xScaleDomain)
        .range([0, width - margin.right - margin.left])
      const yMax = maxBy(props.data, d => d.vote_average)
      const yMin = minBy(props.data, d => d.vote_average)
      const yScaleDomain = [(yMin && yMin.vote_average) || 0, (yMax && yMax.vote_average) || 0]
      const yScale = scaleLinear()
        .domain(props.isYDomainSynced ? [0, 10] : yScaleDomain)
        .range([height - margin.bottom - margin.top, 0])
      const sizeScale = scaleSqrt()
        .domain(props.sizeScaleDomain)
        .range(circleSizeRange)
      const chartArea = select(chartAreaRef.current)
      const svgArea = select(svgRef.current)
      const gridArea = select(gridAreaRef.current)
      const hoverElementArea = select(hoverElementAreaRef.current)
      const voronoiArea = select(voronoiRef.current)
      storedValues.current = {
        isInit: false,
        sizeScale,
        xScale,
        yScale,
        chartArea,
        svgArea,
        gridArea,
        hoverElementArea,
        voronoiArea,
        filteredData: genreFilter.length ? data.filter(d => d.genres.some(id => genreFilter.includes(id))) : data
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
      setTotalNumber(data.length)
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
      const newFilteredData = genreFilter.length ? data.filter(d => d.genres.some(id => genreFilter.includes(id))) : data
      storedValues.current = {
        ...storedValues.current,
        filteredData: newFilteredData
      }
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
    }
  }, [genreFilter])

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
    addUpdateInteractions
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
            letter-spacing: 1.25px;
            text-transform: uppercase;
            color: ${colors.bgColorPrimaryLight};
            position: absolute;
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
              font-weight: 500;
              text-transform: uppercase;
              color: ${colors.bgColorSecondary};
              position: absolute;
              top: 8px;
            `}
          >
            {totalNumber && totalNumber.toString().padStart(3, '0')}
          </div>
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
