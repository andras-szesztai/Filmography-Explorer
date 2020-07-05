/* eslint-disable @typescript-eslint/no-explicit-any */
import { Selection } from 'd3-selection'
import 'd3-transition'
import { ScaleTime } from 'd3-scale'

// Types
import { FormattedPersonCreditDataObject } from './person'

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
