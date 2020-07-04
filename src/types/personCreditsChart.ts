import { FormattedPersonCreditDataObject } from './person'

export interface ChartSettings {
  nameId: number
  movieSearchData: FormattedPersonCreditDataObject[]
  isBoth: boolean
  scales: {
    xScaleDomain: Date[] | undefined[]
    sizeScaleDomain: number[] | undefined[]
  }
}
