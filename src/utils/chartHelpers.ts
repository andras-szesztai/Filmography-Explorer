import { ScaleTime } from 'd3-scale'
import { FormattedPersonCreditDataObject } from '../types/person'
import { MovieObject } from '../types/movie'

interface GetYPositionParams {
  data: FormattedPersonCreditDataObject
  mainData: FormattedPersonCreditDataObject[]
  isBoth: boolean
}

export const getYPosition = ({ data, mainData, isBoth }: GetYPositionParams) => {
  if (!isBoth) {
    return 1
  }
  if (mainData.find(({ id }) => data.id === id)) {
    return 0
  }
  return 1
}

interface GetXPositionParams {
  data: MovieObject
  left: number
  width: number
  xScale: ScaleTime<number, number>
}

export function getXPosition({ data, left, width, xScale }: GetXPositionParams) {
  return Number(xScale(new Date(data.date)) + left >= width / 2)
}
