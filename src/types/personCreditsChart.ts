import { FormattedPersonCreditDataObject } from './person'
import { MovieObject } from './movie'

export interface ChartSettings {
  nameId: number
  movieSearchData: FormattedPersonCreditDataObject[]
  isBoth: boolean
  scales: {
    xScaleDomain: Date[]
    sizeScaleDomain: number[]
  }
  dataSets: {
    crew: MovieObject[]
    cast: MovieObject[]
  }
}

export interface HoveredMovie {
  id: number
  data: FormattedPersonCreditDataObject
  yPosition: number
  xPosition: number
}
