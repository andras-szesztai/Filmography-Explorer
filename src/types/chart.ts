/* eslint-disable @typescript-eslint/no-explicit-any */
import { Selection } from 'd3-selection'
import 'd3-transition'
import { ScaleTime, ScalePower, ScaleLinear } from 'd3-scale'

// Types
import { FormattedPersonCreditDataObject, PersonCredits } from './person'

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
  mainData: FormattedPersonCreditDataObject[]
  subData: FormattedPersonCreditDataObject[]
  uniqData: FormattedPersonCreditDataObject[]
}

export interface BubbleChartStoredValues extends StoredValues {
  sizeScale: ScalePower<number, number>
  yScale: ScaleLinear<number, number>
  gridArea: Selection<SVGGElement | any, any, any, any>
  filteredData: FormattedPersonCreditDataObject[]
}

interface ChartProps {
  xScaleDomain: Date[]
  hoveredMovieID: number
  isFirstEntered: boolean
  setIsFirstEntered: (bool: boolean) => void
  activeMovieID: number
  genreFilter: number[]
}

export interface DateAxisProps extends ChartProps {
  dataSets: PersonCredits
  isBoth: boolean
}

export interface BubbleChartProps extends ChartProps {
  sizeScaleDomain: number[]
  isYDomainSynced: boolean
  isSizeDynamic: boolean
  data: FormattedPersonCreditDataObject[]
  type: string
  tooltipYPosition: number
  title: string
}
