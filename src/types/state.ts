import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from './person'

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

export interface CombinedState {
  personReducer: PersonState
}
