import { maxBy, minBy } from 'lodash'
import { ScaleLinear } from 'd3-scale'

import { MovieObject } from '../../../../../types/movie'

interface Params {
  data: MovieObject[]
  yScale: ScaleLinear<number, number>
  isYDomainSynced: boolean
}

export const makeYScaleDomain = ({ data, yScale, isYDomainSynced }: Params) => {
  const yMax = maxBy(data, (d: MovieObject) => d.vote_average)
  const yMin = minBy(data, (d: MovieObject) => d.vote_average)
  const yScaleDomain = [(yMin && yMin.vote_average) || 0, (yMax && yMax.vote_average) || 0]
  yScale.domain(isYDomainSynced ? [0, 10] : [yScaleDomain[0] - 0.25, yScaleDomain[1] + 0.25])
  return yScale
}
