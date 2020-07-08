/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { scaleLinear, scaleTime, scaleSqrt } from 'd3-scale'
import { select } from 'd3-selection'
import { useMeasure, usePrevious } from 'react-use'
import 'd3-transition'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'

// Types
import { maxBy, minBy } from 'lodash'
import { BubbleChartStoredValues } from '../../../../types/chart'
import { chartSideMargins, circleSizeRange, fontSize, colors, circleFillOpacity } from '../../../../styles/variables'
import { FormattedPersonCreditDataObject } from '../../../../types/person'
import { createGrid, createGridText, createCircles, createUpdateVoronoi } from './functions/elementFunctions'
import { createBubbleChartRefElements } from '../DateAxis/functions/elementFunctions'
import { getXPosition } from '../../../../utils/chartHelpers'
import { populateHoveredMovie, emptyHoveredMovie } from '../../../../reducer/personCreditsChartReducer/actions'
import { duration } from '../../../../styles/animation'
import { setActiveMovieID } from '../../../../reducer/movieReducer/actions'

const margin = {
  top: 5,
  bottom: 5,
  ...chartSideMargins
}

interface Props {
  xScaleDomain: Date[]
  sizeScaleDomain: number[]
  isFirstEntered: boolean
  setIsFirstEntered: (bool: boolean) => void
  isYDomainSynced: boolean
  isSizeDynamic: boolean
  data: FormattedPersonCreditDataObject[]
  activeMovieID: number
  type: string
  tooltipYPosition: number
}

export default function BubbleChart(props: Props) {
  const dispatch = useDispatch()
  const { data } = props

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
        dispatch(emptyHoveredMovie())
      })
      .on('click', (d: any) => {
        if (props.activeMovieID !== d.id) {
          dispatch(
            setActiveMovieID({
              id: d.id,
              position: getXPosition({
                data: d,
                left: margin.left,
                width,
                xScale
              })
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
        isInit: true,
        sizeScale,
        xScale,
        yScale,
        chartArea,
        svgArea,
        gridArea,
        hoverElementArea,
        voronoiArea
      }
      const gridArgs = { storedValues, left: margin.left, width }
      createGrid(gridArgs)
      createGridText(gridArgs)
      createCircles({
        storedValues,
        data,
        isSizeDynamic: props.isSizeDynamic
      })
      createUpdateVoronoi({
        storedValues,
        margin,
        data,
        width,
        height,
        activeMovieID: props.activeMovieID,
        addUpdateInteractions
      })
      setTotalNumber(data.length)
      if (props.activeMovieID) {
        createBubbleChartRefElements({
          data,
          activeMovieID: props.activeMovieID,
          storedValues,
          type: props.type,
          isSizeDynamic: props.isSizeDynamic,
          height
        })
      }
    }
  })

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
      <div
        css={css`
          position: absolute;
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
            opacity: ${circleFillOpacity};
          `}
        >
          Cast
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
      {/* <LabelContainer>Avg. user score</LabelContainer>  */}
    </div>
  )
}
