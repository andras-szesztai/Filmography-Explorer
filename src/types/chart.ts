/* eslint-disable @typescript-eslint/no-explicit-any */
import { Selection } from 'd3-selection'
import 'd3-transition'
import { ScaleTime, ScalePower, ScaleLinear } from 'd3-scale'

// Types
import { MovieObject } from './movie'

export interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface StoredValues {
  isInit: boolean
  xScale: ScaleTime<number, number>
  svgArea: Selection<SVGSVGElement | any, any, any, any>
  chartArea: Selection<SVGGElement | any, any, any, any>
  voronoiArea: Selection<SVGGElement | any, any, any, any>
  hoverElementArea: Selection<SVGGElement | any, any, any, any>
}

export interface AxisStoredValues extends StoredValues {
  mainData?: MovieObject[]
  subData?: MovieObject[]
  uniqData?: MovieObject[]
}

export interface BubbleChartStoredValues extends StoredValues {
  sizeScale: ScalePower<number, number>
  yScale: ScaleLinear<number, number>
  gridArea: Selection<SVGGElement | any, any, any, any>
  filteredData: MovieObject[]
}

interface ChartProps {
  xScaleDomain: Date[]
  hoveredMovieID: number
  isFirstEntered: boolean
  setIsFirstEntered: (bool: boolean) => void
  activeMovieID: number
  genreFilter: number[]
  personFilter?: number[]
  isBookmarkChart: boolean
}

export interface DateAxisProps extends ChartProps {
  dataSets:
    | {
        cast: MovieObject[]
        crew: MovieObject[]
      }
    | MovieObject[]
  isBoth: boolean
  tooltipWithRole: boolean
}

export interface BubbleChartProps extends ChartProps {
  sizeScaleDomain: number[]
  isSizeDynamic: boolean
  data: MovieObject[]
  type: string
  tooltipYPosition: number
  title: string
}
