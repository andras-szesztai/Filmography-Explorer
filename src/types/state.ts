import { PersonDetails, FormattedPersonCreditDataObject } from './person'

export interface PersonState {
  activeNameID: number
  dataSets?: {
    details: PersonDetails[]
    credits: {
      cast: FormattedPersonCreditDataObject[]
      crew: FormattedPersonCreditDataObject[]
    }
  }
  loading: {
    personDetails: boolean
    personCredits: boolean
  }
  error: {
    personDetails: boolean
    personCredits: boolean
  }
}

export interface CombinedState {
  personReducer: PersonState
}
