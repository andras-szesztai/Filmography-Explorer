export interface Person {
  id: number
  name: string
}

export interface PersonCreditDataObject extends Person {
  release_date: string
  first_air_date: string
  vote_count: number
  vote_average: number
  title: string
  character?: string
  job?: string
}

export interface FormattedPersonCreditDataObject extends Person {
  id: number
  name: string
  release_date: string
  first_air_date: string
  vote_count: number
  vote_average: number
  title: string
  character?: string | undefined
  job: (string | undefined)[]
}

export interface PersonDetailsObject extends Person {
  release_date: string
}
