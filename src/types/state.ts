import { PersonDetails, FormattedPersonCreditDataObject } from './person'

export interface PersonState {
  activeNameID: number
  dataSets: {
    details: PersonDetails | undefined
    credits: {
      cast: FormattedPersonCreditDataObject[] | undefined
      crew: FormattedPersonCreditDataObject[] | undefined
    }
  }
  loading: {
    personDetails: boolean
    personCredits: boolean
  }
  error: string
}

export interface CombinedState {
  personReducer: PersonState
}
