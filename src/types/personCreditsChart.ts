import { FormattedPersonCreditDataObject } from './person'
import { MovieObject } from './movie'

export interface ChartSettings {
  nameId: number
  movieSearchData: FormattedPersonCreditDataObject[]
  xScaleDomain: Date[]
  data: MovieObject[]
}

export interface HoveredMovie {
  id: number
  data: MovieObject
  xPosition: number
}
