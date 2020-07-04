import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from './person'
import { MovieObject } from './personCreditsChart'

export interface PersonState {
  activeNameID: number
  isBoth: boolean
  isFetched: boolean
  dataSets: {
    details: PersonDetails
    credits: {
      cast: FormattedPersonCreditDataObject[]
      crew: FormattedPersonCreditDataObject[]
    }
  }
  favorites: FavoritePersonsObject
  loading: {
    personDetails: boolean
    personCredits: boolean
  }
  error: string
}

export interface PersonCreditsChartState {
  nameId: number
  movieSearchData: MovieObject[]
  isBoth: boolean
  scales: {
    xScaleDomain: Date[]
    sizeScale: number[]
  }
  isYDomainSynced: boolean
  isSizeDynamic: boolean
  hoveredMovie: {
    id: number
    data: FormattedPersonCreditDataObject
    yPosition: number
    xPosition: number
  }
}

export interface CombinedState {
  personReducer: PersonState
  personCreditsChartReducer: PersonCreditsChartState
}
