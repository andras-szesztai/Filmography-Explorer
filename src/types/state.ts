import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from './person'

export interface PersonState {
  activeNameID: number
  isBoth: boolean
  dataSets: {
    details: PersonDetails | undefined
    credits: {
      cast: FormattedPersonCreditDataObject[] | undefined
      crew: FormattedPersonCreditDataObject[] | undefined
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
