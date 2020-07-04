export interface Person {
  id: number
  name: string
}

export interface PersonDetails extends Person {
  birthday: string
  place_of_birth: string
  deathday?: string
  known_for_department: string
  also_known_as: string[]
  gender: number
  biography: string
  popularity: number
  profile_path: string
  imdb_id: string
  homepage?: string
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

export interface PersonCredits {
  cast: FormattedPersonCreditDataObject[]
  crew: FormattedPersonCreditDataObject[]
}

export interface PersonDataSets {
  details?: PersonDetails
  credits: PersonCredits
}

export interface FavoritePersonsObject {
  [id: number]: {
    name: string
    id: number
    credits: number[]
  }
}
