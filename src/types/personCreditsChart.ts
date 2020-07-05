import { FormattedPersonCreditDataObject } from './person'

export interface ChartSettings {
  nameId: number
  movieSearchData: FormattedPersonCreditDataObject[]
  isBoth: boolean
  scales: {
    xScaleDomain: Date[]
    sizeScaleDomain: number[]
  }
}

export interface HoveredMovie {
  id: number
  data: FormattedPersonCreditDataObject
  yPosition: number
  xPosition: number
}
