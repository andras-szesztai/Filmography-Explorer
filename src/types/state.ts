import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from './person'
import { ChartSettings } from './personCreditsChart'

export interface PersonState {
  activeNameID: number
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

export interface HoveredMovie {
  id: number
  data: FormattedPersonCreditDataObject
  yPosition: number
  xPosition: number
}

export interface PersonCreditsChartState extends ChartSettings {
  isYDomainSynced: boolean
  isSizeDynamic: boolean
  hoveredMovie: HoveredMovie
}

export interface CombinedState {
  personReducer: PersonState
  personCreditsChartReducer: PersonCreditsChartState
}
